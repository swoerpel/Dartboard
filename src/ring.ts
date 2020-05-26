import { Point, RingParams } from "./models";
import { params } from "./params";
import { getRadialVertices } from "./helpers";

export class RingGroup{

    private rings: RingParams[] = [];
    private layout_LUT = {
        'concentric': ():Point[] => {
            return new Array(params.ring_group.count)
            .fill({
                x: params.canvas.width / 2,
                y: params.canvas.height / 2,
            });
        },
        'linear': ():Point[] => {
            const points = [];
            const step = params.canvas.width / (params.ring_group.count + 1)
            for(let i = 0; i < params.ring_group.count; i++){
                points.push({
                    x: (i + 1) * step,
                    y: params.canvas.height / 2,
                })
            }
            return points;
        }
    }

    constructor(private graphic){console.log()}

      setup(){
        const origins = this.layout_LUT[params.ring_group.layout]();
        for(let i = 0; i < params.ring_group.count; i++){
            const radius = params.ring_group.radius[i % params.ring_group.radius.length] * params.canvas.height
            const spokes = params.ring_group.spokes[i % params.ring_group.spokes.length]
            this.rings.push({
                index: i,
                origin: origins[i],
                radius: radius,
                draw: params.ring_group.draw[i % params.ring_group.draw.length],
                stroke_weight: params.ring_group.stroke_weight[i % params.ring_group.stroke_weight.length],
                points: getRadialVertices(
                    origins[i],
                    radius,
                    spokes,
                ),
            })
        }
        console.log('rings ->',this.rings)
      }


      draw(){
        
        this.rings.forEach((ring: RingParams, i) =>{
            if(ring.draw){
                this.graphic.strokeWeight(params.canvas.width * ring.stroke_weight)
                this.graphic.stroke('white');
                ring.points.forEach((p: Point)=>{
                    this.graphic.point(p.x,p.y);
                })
            }
        })
      }
    
}