import * as p5 from 'p5'
import 'p5/lib/addons/p5.sound'
import {params} from './params'
import {chromotome_palettes} from './chromotome';
import * as chroma from 'chroma.ts';
interface Dart {
  x: number;
  y: number;
  index: number;
  radius: number;
}

interface TensionLine {
  start_index: number;
  end_index: number;
  tension: number;
}


var sketch = function (p: p5) {
  var pause = false;
  var auto_mode = false;
  var canvas;
  var graphic;
  var draw_index = 0;
  var darts: Dart[] = [];
  var tension_lines: TensionLine[] = [];
  var color_machine;
  var color_palettes = {};

  p.setup = function () {
    setupColors();
    setupGraphics()
    console.log('chromotome colors ->',chromotome_palettes)
    throwDart();
  }

  function setupColors(){
    console.log('chromotome_palettes',chromotome_palettes)
    for (let i = 0; i < chromotome_palettes.length; i++) {
      let key = chromotome_palettes[i].name;
      color_palettes[key] = new Object(chromotome_palettes[i].colors);
    }
    color_palettes = { ...color_palettes, ...chroma.brewer };
    console.log(color_palettes,params.color.palette,color_palettes[params.color.palette])
    if(params.color.palette in color_palettes)
      color_machine = chroma.scale(color_palettes[params.color.palette]);
    else
      color_machine = chroma.scale(['black','white']);
  }

  function setupGraphics(){
    canvas = p.createCanvas(params.canvas.width, params.canvas.height);
    canvas.background(params.color.background)
    graphic = p.createGraphics(params.canvas.width, params.canvas.height)
  }

  p.draw = function () {
    if(!pause){
      if(auto_mode)
        throwDart();
      if(params.draw.darts)
        drawDarts();
      if(params.draw.tension_lines)
        drawTensionLines();
      p.image(graphic, 0, 0)
      draw_index++;
    }
  }
  
  function drawDarts() {
    graphic.stroke(params.dart.border_color)
    graphic.strokeWeight(params.dart.stroke_weight);
    graphic.fill(params.dart.fill_color)
    darts.forEach((d) => {
      graphic.circle(d.x,d.y,d.radius)
    })
  }

  function drawTensionLines(){
    // console.log(tension_lines)
    const cv = draw_index % params.color.domain / params.color.domain;
    const rgba_color = color_machine(cv).rgba()
    rgba_color[3] = params.draw.alpha * 255;
    if(params.draw.fill){
      graphic.fill(rgba_color)
    }else{
      graphic.noFill();
    }
    if(params.draw.outline){
      graphic.strokeWeight(params.tension_line.stroke_weight)
      graphic.stroke(rgba_color)
    }else{
      graphic.strokeWeight(0)
    }
    if(tension_lines.length != 0){
      let t = tension_lines[tension_lines.length - 1]
      const start_x = darts[t.start_index].x;
      const start_y = darts[t.start_index].y;
      const end_x = darts[t.end_index].x;
      const end_y = darts[t.end_index].y;
      const corner_x = end_x;
      const corner_y = start_y;
      graphic.beginShape()
      smooth_line([
        {x:start_x,y:start_y},
        {x:corner_x,y:corner_y},
        {x:end_x,y:end_y},
      ],8,0).forEach((v)=>graphic.vertex(v.x,v.y));
      graphic.endShape();
    }
  }

  function smooth_line(line, total_iters, current_iter, dist_ratio = (params.draw.dart_count % params.draw.smooth_domain) / (params.draw.smooth_domain)) {
    if(total_iters == current_iter)
      return line;
    else{
      let sm_line = []
      sm_line.push(line[0])
      for (let i = 0; i < line.length - 1; i++) {
        let distance = Math.sqrt(Math.pow(line[i + 1].x - line[i].x, 2) + Math.pow(line[i + 1].y - line[i].y, 2))
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
      sm_line.push(line[line.length - 1])
      return smooth_line(sm_line, total_iters, current_iter + 1, dist_ratio)
    }
  }

  function throwDart(){
    // trimDartboardData()
    const dart = {
      x: genRand(params.dart.radius, params.canvas.width - params.dart.radius),
      y: genRand(params.dart.radius, params.canvas.height - params.dart.radius),
      index: darts.length,
      radius: params.dart.radius
    }
    darts.push(dart)

    if(darts.length != 1){
      tension_lines.push({
        start_index: darts[darts.length - 2].index,
        end_index: darts[darts.length - 1].index,
        tension: 1
      })

    }
    params.draw.dart_count++;
  }

  function trimDartboardData(){
    if(tension_lines.length > 10)
      tension_lines = []
    if(darts.length > 10){
      darts = [];
      throwDart();
    }
    
  }

  p.keyPressed = function (event: KeyboardEvent):void{
    console.log(event.key)
    switch(event.key){
      case " ": pause = !pause; break;
      case "a": auto_mode = !auto_mode; break;
      case "d": throwDart() break;
    }
  }
 
  var round = (N,acc = 100000) => {
    return Math.round(N * acc) / acc
  }

  function genRand(min, max, decimalPlaces = 0) {  
    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
  }

}

new p5(sketch)
