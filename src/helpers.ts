import { Point } from "./models";

export var Round = (N,acc = 100000) => {
    return Math.round(N * acc) / acc
}

export var minMaxPoint = (array: Point[]):{
  min_index: number;
  max_index: number;
  min_point: Point;
  max_point: Point;
} => {
  let min = 100000;
  let max = -100000;
  let min_index = -1;
  let max_index = -1;
  let min_point = null;
  let max_point = null;
  array.forEach((point,i)=>{
    if(point.value > max){
      max = point.value
      max_index = i
      max_point = point
    }
    if(point.value < min){
      min = point.value
      min_index = i
      min_point = point
    }
  })
  return{
    min_index: min_index,
    max_index: max_index,
    min_point: min_point,
    max_point: max_point,
  }
}

export var minPoint = (array: Point[]):{
  min_index: number;
  min_point: Point
}=> {
  let min = 100000;
  let min_index = -1;
  let min_point = null;
  array.forEach((point,i)=>{
    if(point.value < min){
      min = point.value
      min_index = i
      min_point = point
    }
  })
  return{
    min_index: min_index,
    min_point: min_point,
  }
}

export var maxPoint = (array: Point[]):{
  max_index: number;
  max_point: Point
}=> {
  let max = -100000;
  let max_index = -1;
  let max_point = null;
  array.forEach((point,i)=>{
    if(point.value > max){
      max = point.value
      max_index = i
      max_point = point
    }
  })
  return{
    max_index: max_index,
    max_point: max_point,
  }
}

export var sumPointValues = (array: Point[]) => {
  return array.map(point => point.value)
    .reduce((next_value, sum): number => {
      return (next_value + sum);
  },0)
}

export function arrayRotate(arr: any[], count: number) {
    count -= arr.length * Math.floor(count / arr.length);
    arr.push.apply(arr, arr.splice(0, count));
    return arr;
}

export function getRadialVertices(
  origin: {x:number,y:number}, 
  radius: number, 
  vertices: number = 4,
  rotation:number = 0,
) {
  let angle = Math.PI * 2 / vertices
  let points = []
  let orientation = Math.PI / vertices // -> pointy top : 0 -> flat top
  rotation = rotation / (Math.PI * 2);
  for (let a = -angle; a < Math.PI * 2 * (1 - 1 / vertices); a += angle) {
      let sx = origin.x + Math.cos(a + orientation + rotation) * radius;
      let sy = origin.y + Math.sin(a + orientation + rotation) * radius;
      points.push({ x: Round(sx), y: Round(sy) })
  }
  return points
}


export function RandReal(min, max, decimalPlaces = 0) {  
    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
}

export function arrSum(array){
  return array.reduce(
      (sum, num) => sum + (Array.isArray(num) ? arrSum(num) : num * 1),
      0
  );
}

export function SmoothLine(
  line, 
  total_iters, 
  current_iter, 
  dist_ratio,
  lattice = false
) {
  if(total_iters == current_iter)
    return line;
  else{
    let sm_line = []
    if(lattice)
      sm_line.push(line[0])
    for (let i = 0; i < line.length - 1; i++) {
      let distance = 
        Math.sqrt(Math.pow(line[i + 1].x - line[i].x, 2) + 
        Math.pow(line[i + 1].y - line[i].y, 2))
      let d = distance * dist_ratio;
      sm_line.push({
        x: line[i].x + (d / distance) * (line[i + 1].x - line[i].x),
        y: line[i].y + (d / distance) * (line[i + 1].y - line[i].y)
      })
      d = distance * (1 - dist_ratio);
      sm_line.push({
        x: line[i].x + (d / distance) * (line[i + 1].x - line[i].x),
        y: line[i].y + (d / distance) * (line[i + 1].y - line[i].y)
      })
    }
    if(lattice)
      sm_line.push(line[line.length - 1])
    return SmoothLine(sm_line, total_iters, current_iter + 1, dist_ratio)
  }
}