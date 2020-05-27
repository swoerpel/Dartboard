import { Point, RingParams } from "./models";
import { params } from "./params";
import { getRadialVertices, maxPoint, minPoint, arrayRotate } from "./helpers";
import { POINT_CONVERSION_COMPRESSED } from "constants";

export class RingGroup{

    private rings: RingParams[] = [];
    private origin_layout_LUT = {
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
                    x: (i + 1) * (step),
                    y: params.canvas.height / 2,
                })
            }
            return points;
        }
    }

    private point_value_LUT = {
        'linear': (index = -1,spokes = -1, offset = 0): number => 
            Math.floor(
                index * 
                params.ring_group.point.value.scale +
                offset
            ) % 
            params.ring_group.point.value.domain,
        'random': (index = -1,spokes = -1,offset = 0): number => 
            Math.floor(
                Math.random() *
                spokes *
                params.ring_group.point.value.scale +
                offset
            )
    }

    private jump_rule_LUT = {
        'max':(ring_index: number): Point => {
            let point = maxPoint(this.rings[ring_index].points).max_point;
            const p = JSON.parse(JSON.stringify(point));
            point.value = -1;
            return p;
        },
        'min':(ring_index: number): Point => {
            let point = minPoint(this.rings[ring_index].points).min_point;
            const p = JSON.parse(JSON.stringify(point));
            point.value = 100000;
            return p;
        },

    }

    constructor(
        private graphic,
        private color_machine){}

      setup(){
        const origins = this.origin_layout_LUT[params.ring_group.layout]();
        for(let i = 0; i < params.ring_group.count; i++){
            const radius = params.ring_group.radius[i % params.ring_group.radius.length] * params.canvas.height
            const spokes = params.ring_group.spokes[i % params.ring_group.spokes.length]
            const value_type = params.ring_group.point.order[i % params.ring_group.point.order.length];
            const value_offset = params.ring_group.point.value.offset[i % params.ring_group.point.value.offset.length]
            console.log('value_offset',value_offset)
            let points = getRadialVertices(
                origins[i],
                radius,
                spokes,
            ).map((point, j) => {
                return{
                    ...point, 
                    value: this.point_value_LUT[value_type]((j + value_offset) % spokes,spokes)
                }
            });
            // points = arrayRotate(points,value_offset)
            console.log(points)
            this.rings.push({
                index: i,
                origin: origins[i],
                radius: radius,
                draw: params.ring_group.draw[i % params.ring_group.draw.length],
                stroke_weight: params.ring_group.stroke_weight[i % params.ring_group.stroke_weight.length],
                points: points,
                max_value: maxPoint(points).max_point.value,
            })
        }
        console.log('rings ->',this.rings)
      }

    draw(){
        this.rings.forEach((ring: RingParams, i) =>{
            if(ring.draw){
                this.graphic.strokeWeight(params.canvas.width * ring.stroke_weight)
                ring.points.forEach((p: Point)=>{
                    let cv = p.value / ring.max_value;
                    let color = this.color_machine(cv).rgba()
                    color[3] = 255;
                    this.graphic.stroke(color);
                    this.graphic.point(p.x,p.y);
                })
                if(params.ring_group.draw_origins){
                    this.graphic.stroke('white');
                    this.graphic.point(ring.origin.x, ring.origin.y);
                }
            }
        })
    }

    jump(ring_index): Point{
        const rule = params.ring_group.jump.rule;
        return this.jump_rule_LUT[rule](ring_index);
    }


    
}