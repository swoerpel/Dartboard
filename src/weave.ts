import { params } from "./params";
import { Point } from "./models";
import { sumPointValues, SmoothLine } from "./helpers";



export class Weave{
    constructor(
        public graphic, 
        public color_machine,
    ){}

    setup(){

    }

    draw(p,next_jumps: Point[]){
        const pause_sum = sumPointValues(next_jumps);
        if(pause_sum == -params.weave.pattern.length){
            return false;
        }else{
            next_jumps = SmoothLine(
            [...next_jumps],
            params.weave.smooth.total_iters,
            params.weave.smooth.init_iter,
            params.weave.smooth.dist_ratio,
            params.weave.smooth.lattice,
            );
            this.graphic.stroke(params.weave.draw.stroke)
            this.graphic.strokeWeight(params.weave.draw.stroke_weight)
            if(params.weave.draw.fill){
                this.graphic.fill('lightblue')
            }else{
                this.graphic.noFill();
            }
            
            this.graphic.beginShape();
            next_jumps.forEach((next_jump)=>{
                if(next_jump.value != -1){
                    this.graphic.vertex(
                        next_jump.x,
                        next_jump.y
                    );
                }
            })
            this.graphic.endShape(p.CLOSE);
        }
        return true;
    }

}