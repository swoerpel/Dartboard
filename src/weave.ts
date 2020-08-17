import {params} from './params'
import { SmoothLine, arrSum } from './helpers';
import * as chroma from 'chroma.ts';
import { GridMachine } from './grid_machine';
import { _GridMachine } from './grid_machine_';

export interface Cell{
    value: number;
    x:number;
    y:number;
    cx:number;
    cy:number;
}

export class Weave {
    grid: Cell[][] = [];
    grid_sum: number; 
    start_grid_sum: number;
    cell_width: number = params.canvas.width / params.grid.cols;
    cell_height: number = params.canvas.height / params.grid.rows;
    jump_count: number = 0;
    cell_count: number = 0;

    grid_machine: GridMachine;
    _grid_machine: _GridMachine;
    public knightStartCorners = [
        {x:0,y:0},
        {x:0,y:params.grid.rows - 1},
        {x:params.grid.cols - 1,y:params.grid.rows - 1},
        {x:params.grid.cols - 1,y:0}
    ]


    knight_x: number = this.knightStartCorners[0].x;
    knight_y: number = this.knightStartCorners[0].y;
    weave_queue: {x:number,y:number}[];
    knight_jump_offsets: {x:number;y:number}[] = [];

    constructor(
        public graphic, 
        public color_machine,
    ){
        this.grid_machine = new GridMachine();
        this._grid_machine = new _GridMachine(params.grid.cols,params.grid.rows);
    }



    RefreshKnight(start_index){
        this.knight_x = this.knightStartCorners[start_index].x;
        this.knight_y = this.knightStartCorners[start_index].y;
        for(let i = 0; i < 4; i++){
            const muls = Array.from(i.toString(2).padStart(2,'0')).map((m) => parseInt(m));
            const x_mul = muls[0] ? -1 : 1;
            const y_mul = muls[1] ? -1 : 1;
            const x = x_mul * params.knight.jump.x
            const y = y_mul * params.knight.jump.y
            this.knight_jump_offsets.push({x:x,y:y});
            this.knight_jump_offsets.push({x:y,y:x});
        }
        // console.log('this.knight_jump_offsets',this.knight_jump_offsets)
    }

    RefreshQueue(){
        this.weave_queue = new Array(params.weave.queue_length).fill({x:this.knight_x,y:this.knight_y});
    }

    RefreshGrid(){
        this.grid = []
        this.cell_count = 0;
        // let value_grid = this._grid_machine.orderedSequenceGrid(params.grid.max_value);
        // let value_grid = this._grid_machine.orderedDomainGrid(params.grid.max_value);
        let value_grid = this._grid_machine.stripeGrid(params.grid.max_value);
        for(let i = 0; i < params.grid.cols; i++){
            let row = [];
            for(let j = 0; j < params.grid.rows; j++){

                let value = value_grid[i][j].value;
                // let value = this.grid_machine.generate(this.cell_count,i,j,params.grid);
                row.push({
                    index: this.cell_count++,
                    value: value,
                    x: i * this.cell_width,
                    y: j * this.cell_height,
                    cx: i * this.cell_width + (this.cell_width / 2),
                    cy: j * this.cell_height + (this.cell_height / 2)
                })
            }
            this.grid.push(row)
        }
        this.start_grid_sum = arrSum(this.grid.map((row)=> row.map((cell)=>cell.value)))
        // this.grid.forEach((row) =>row.forEach((cell)=>console.log(cell)));
    }




    Jump(weave_step){
        const options = this.calculateNext()
        if(options.length == 0){
            this.jump_count = 0;
            return false;
        }
        if(params.draw.jump_options)
            this.drawOptions(options);
        if(params.draw.knight)
            this.drawKnight();
        if(params.draw.weave && weave_step)
            this.drawWeave(); 
        
        this.rotateWeaveQueue()

        let next_jump_index = this.nextJumpIndex(options);
        this.knight_x = options[next_jump_index].x
        this.knight_y = options[next_jump_index].y
        this.grid[this.knight_x][this.knight_y].value = -1;
        this.jump_count = this.jump_count + 1
        // this.printWeaveQueue()
        return true;
    }

    setKnightColors(){
        this.graphic.strokeWeight(params.knight.width * this.cell_width);
        let cv = arrSum(this.grid.map((row)=> row.map((cell)=>cell.value))) / this.start_grid_sum;
        let col = this.color_machine(cv).rgba();
        col[3] = 255 * params.knight.alpha;
        this.graphic.fill(col);
        this.graphic.stroke(this.color_machine(1 - cv).hex())
    }

    // called on every draw
    setWeaveColors(stroke_width_offset = 0){
        let col;
        if(params.weave.color_mode === 'const'){
            col = params.color.const_color
            col = chroma.color(col).rgba()
        }else if(params.weave.color_mode === 'step'){
            let cv = (this.jump_count % params.weave.color_domain) / params.weave.color_domain;
            col = this.color_machine(cv).rgba()
        }else if(params.weave.color_mode === 'horizontal'){
            let cv = this.weave_queue[0].x / params.grid.cols;
            col = this.color_machine(cv).rgba()
        }else if(params.weave.color_mode === 'vertical'){
            let cv = this.weave_queue[0].y / params.grid.rows;
            col = this.color_machine(cv).rgba()
        }

        // if(!params.color.const){
        //     let cv = (this.jump_count % params.weave.color_domain) / params.weave.color_domain;
        //     col = this.color_machine(cv).rgba()
        // }
        // else{
        //     col = params.color.const_color
        //     col = chroma.color(col).rgba()
        // }
        col[3] = params.weave.alpha * 255;
        this.graphic.strokeWeight(params.weave.width.value * this.cell_width + stroke_width_offset);
        this.graphic.stroke(col);
    }

    setOptionsColors(){
        this.graphic.strokeWeight(0);
        // this.graphic.fill(params.weave.stroke_weight);
        let cv = (this.jump_count % params.jump_options.color_domain) / params.jump_options.color_domain;
        let col = this.color_machine(1 - cv).rgba()
        col[3] = params.jump_options.alpha * 255;
        col[3] = 150
        this.graphic.fill(col);
    }

    rotateWeaveQueue(){
        this.weave_queue.push({
            x: this.knight_x,
            y: this.knight_y,
        })
        this.weave_queue.shift();
    }

    printWeaveQueue(){
        console.log('weave queue')
        this.weave_queue.forEach((w)=>{
            console.log('x: ',w.x,',y: ',w.y)
        })
    }

    drawKnightLUT = {
        'squares': ()=> {
            this.graphic.rect(
                this.grid[this.knight_x][this.knight_y].x, 
                this.grid[this.knight_x][this.knight_y].y, 
                this.cell_width, 
                this.cell_height
            )
        },
        'bars': ()=> {
            this.graphic.rect(
                this.grid[this.knight_x][this.knight_y].x, 
                this.grid[this.knight_x][this.knight_y].y, 
                this.cell_width, 
                params.canvas.height - this.grid[this.knight_x][this.knight_y].y,
            )
        }
    }

    drawKnight(){
        this.setKnightColors()
        this.drawKnightLUT[params.knight.draw_mode]();
    }
    
    drawWeave(){
        const weave = this.weave_queue.map((cell_index) => {
            return{
                x: this.grid[cell_index.x][cell_index.y].cx,
                y: this.grid[cell_index.x][cell_index.y].cy,
            }
        })
        this.graphic.noFill();
        let line = SmoothLine(
            weave,
            params.weave.smooth.iters,
            params.weave.smooth.iter_start,
            params.weave.smooth.ratio,   
        );
        if(params.weave.outline.width != 0){
            this.setWeaveColors(params.weave.outline.width);
            this.graphic.stroke(params.weave.outline.color);
            this.graphic.beginShape()
            line.forEach((v)=>this.graphic.vertex(v.x,v.y));
            this.graphic.endShape();
        }
        this.setWeaveColors();
        this.graphic.beginShape()
        line.forEach((v)=>this.graphic.vertex(v.x,v.y));
        this.graphic.endShape();
    }

    drawOptions(options){
        this.setOptionsColors();
        options.map((op) =>{
            if(params.jump_options.shape == 'circle'){
                this.graphic.circle(
                    this.grid[op.x][op.y].cx, 
                    this.grid[op.x][op.y].cy, 
                    this.cell_width * params.jump_options.radius, 
                )
            }
            if(params.jump_options.shape == 'rect'){
                let w = this.cell_width * params.jump_options.radius
                let h = this.cell_height * params.jump_options.radius
                this.graphic.rect(
                    this.grid[op.x][op.y].cx, 
                    this.grid[op.x][op.y].cy, 
                    w - w/2,
                    h - h/2,
                )
            }
        })
    }

    nextJumpIndex(options){
        let next_jump_index = -1;
        let high_value = -100000;
        options.forEach((option,index)=>{
            if(option.value > high_value){
                high_value = option.value;
                next_jump_index = index;
            }
        })
        return next_jump_index;
    }

    calculateNext(){
        let options = [];
        this.knight_jump_offsets.forEach((offset)=>{
            try{
                const x = this.knight_x + offset.x; 
                const y = this.knight_y + offset.y; 
                const v = this.grid[x][y].value;
                options.push({
                    value: v,
                    x: x,
                    y: y
                })
            }catch{
                
            }
        })
        options = options.filter((o)=>o.value != -1)
        return options
    }

}