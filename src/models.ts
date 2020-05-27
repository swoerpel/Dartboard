export interface Point{
    x: number;
    y: number;
    value?: number;
}

export interface Cell{
    value: number;
    x:number;
    y:number;
    cx:number;
    cy:number;
}


export interface RingParams{
    index:number;
    origin:{x:number;y:number;},
    radius:number;
    draw: boolean;
    stroke_weight:number;
    points:Point[];
}