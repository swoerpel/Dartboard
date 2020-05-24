import {params} from './params'
import { getRadialVertices, SmoothLine } from './helpers';
import { Point } from './models';

export class Clock{
    boundary_ring_points: Point[];
    inner_ring_points: Point[][];
    thread_count: number = 0;
    clock_origin: Point = {
        x:params.canvas.width / 2,
        y:params.canvas.width / 2,
    }
    clock_radius: number = params.boundary_ring.diameter / 2 * params.canvas.width

    constructor(
        public graphic, 
        public color_machine,
    ){}

    public setupRings(){
        this.refreshBoundaryRing();
        this.refreshInnerRings();
    }

    public drawBoundaryRing(){
        this.refreshBoundaryRing();
        this.boundary_ring_points = getRadialVertices(
            this.clock_origin,
            this.clock_radius,
            params.boundary_ring.spokes,
        )
        this.draw_path(
            this.boundary_ring_points,
            params.boundary_ring.stroke_weight,
            params.color.boundary_ring,
            false,
        )
    }

    public drawInnerRings(){
        this.refreshInnerRings();
        this.inner_ring_points.forEach((points, i)=>{
            this.draw_path(
                points, 
                params.inner_rings[i].stroke_weight,
                params.inner_rings[i].color,
                false,
            )
        })
    }

    private getStartEndPoints(): {start:Point,end:Point}{
        while(true){
            const startPoint = this.boundary_ring_points[
                Math.floor(Math.random() * this.boundary_ring_points.length)]
            const endPoint = this.boundary_ring_points[
                    Math.floor(Math.random() * this.boundary_ring_points.length)]
            // console.log('s-e',startPoint, endPoint)
            if (JSON.stringify(startPoint) != JSON.stringify(endPoint))
                return {start:{x:startPoint.x,y:startPoint.y},end:{x:endPoint.x,y:endPoint.y}}
        }
    }

    public drawWeave(){ 
        const start_end_points = this.getStartEndPoints();
        let weave_path = [];    
        weave_path.push(start_end_points.start);
        for(let i = 0; i < params.weave.inner_connections; i++){
            const points = this.inner_ring_points[0]
            const p = points[Math.floor(Math.random() * points.length)];
            // const p = this.inner_ring_points[0].pop()
            weave_path.push(p)
        }
        weave_path.push(start_end_points.end);
        // const c = this.color_machine(1/this.thread_count).hex();
        const c = params.color.weave;
        console.log('weave_path',weave_path)
        this.draw_path(weave_path, params.weave.stroke_weight, c);
        this.thread_count++;
    }

    private refreshBoundaryRing(){
        this.boundary_ring_points = getRadialVertices(
            this.clock_origin,
            this.clock_radius,
            params.boundary_ring.spokes,
        )
    }

    private refreshInnerRings(){
        this.inner_ring_points = params.inner_rings.map((ring)=>{
            return getRadialVertices(
                this.clock_origin,
                ring.diameter / 2 * params.canvas.width,
                ring.spokes
            );
        })
    }
    
    private draw_path(points, stroke_weight, stroke, smooth = true){
        this.graphic.stroke(stroke);
        this.graphic.noFill();
        this.graphic.strokeWeight(stroke_weight);
        this.graphic.beginShape();
        if(smooth){
            this.graphic.vertex(points[0].x, points[0].y)
            SmoothLine(
                [...points], 
                params.weave.smooth_iters, 
                0, 
                params.weave.dist_ratio,
                true,
            ).forEach((p)=>{
                this.graphic.vertex(p.x,p.y)
                // this.graphic.strokeWeight(params.weave.point_size * params.canvas.width);
            })
            this.graphic.vertex(points[points.length - 1].x, points[points.length - 1].y)
        }else{
            this.graphic.strokeWeight(stroke_weight);
            points.forEach((p)=>{
                this.graphic.point(p.x,p.y)
            })
        }
        // this.graphic.vertex(points[0].x,points[0].y)
        this.graphic.endShape()
    }


}