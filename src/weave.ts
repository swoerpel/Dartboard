import {params} from './params'

export interface Cell{
    value: number;
    x:number;
    y:number;
    cx:number;
    cy:number;
}

export class Weave{
    cell_width = params.canvas.width / params.grid.cols;
    cell_height = params.canvas.height / params.grid.rows;
    grid: Cell[][] = [];
    jump_count: number = 0;
    cell_count: number = 0;
    knight_x: number = Math.floor(params.grid.cols / 2);
    knight_y: number = Math.floor(params.grid.rows / 2);
    knight_jump_offsets: {x:number;y:number}[] = [];
    constructor(
        public graphic, 
        public color_machine,
    ){}

    RefreshKnight(){
        for(let i = 0; i < 4; i++){
            const muls = Array.from(i.toString(2).padStart(2,'0')).map((m) => parseInt(m));
            const x_mul = muls[0] ? -1 : 1;
            const y_mul = muls[1] ? -1 : 1;
            const x = x_mul * params.knight.jump_x
            const y = y_mul * params.knight.jump_y
            this.knight_jump_offsets.push({x:x,y:y});
            this.knight_jump_offsets.push({x:y,y:x});
        }
        console.log('this.knight_jump_offsets',this.knight_jump_offsets)
    }

    RefreshGrid(){
        this.grid = []
        this.cell_count = 0;
        for(let i = 0; i < params.grid.cols; i++){
            let row = [];
            for(let j = 0; j < params.grid.rows; j++){
                row.push({
                    index: this.cell_count++,
                    value: Math.floor(Math.random() * params.grid.max_value),
                    x: i * this.cell_width,
                    y: j * this.cell_height,
                    cx: i * this.cell_width + (this.cell_width / 2),
                    cy: j * this.cell_height + (this.cell_height / 2)
                })
            }
            this.grid.push(row)
        }
        // this.grid.forEach((row) =>row.forEach((cell)=>console.log(cell)));
    }

    Jump(){
        const options = this.calculateNext()
        if(options.length == 0){
            console.log("knight trapped")
            this.jump_count = 0;
            return false;
        }
        if(params.draw.jump_options)
            this.drawOptions(options);
        if(params.draw.knight)
            this.drawKnight();
        let next_jump_index = this.nextJumpIndex(options);
        this.knight_x = options[next_jump_index].x
        this.knight_y = options[next_jump_index].y
        this.grid[this.knight_x][this.knight_y].value = -1;
        this.jump_count = (this.jump_count + 1) % params.color.domain;
        return true;
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

    drawKnight(){
        let cv = this.jump_count / params.color.domain;
        this.graphic.fill(this.color_machine(cv).hex());
        this.graphic.rect(
            this.grid[this.knight_x][this.knight_y].x, 
            this.grid[this.knight_x][this.knight_y].y, 
            this.cell_width, 
            this.cell_height
        )
    }

    drawOptions(options){
        options.map((op) =>{
            let cv = this.grid[op.x][op.y].value / params.grid.max_value
            this.graphic.fill(this.color_machine(cv).hex());
            this.graphic.rect(
                this.grid[op.x][op.y].x, 
                this.grid[op.x][op.y].y, 
                this.cell_width, 
                this.cell_height
            )
        })
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
        // console.log('options',options)
        options = options.filter((o)=>o.value != -1)
        return options
    }



}