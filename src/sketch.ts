import * as p5 from 'p5'
import 'p5/lib/addons/p5.sound'
import {params} from './params'
// import {chromotome_palettes} from './chromotome';
import * as chroma from 'chroma.ts';
import { SmoothLine, RandReal } from './helpers';
import * as tome from 'chromotome';

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
  var grid_index_x: number = 0;
  var grid_index_y: number = 0;
  var darts: Dart[] = [];
  var tension_lines: TensionLine[] = [];
  var color_machine;
  var color_palettes = {};
  var gridValues = [];
  p.setup = function () {
    setupColors();
    setupGraphics();
    initGridValues();
    throwDart();
  }

  function initGridValues(){
    const cell_width = params.canvas.width / params.grid.cols;
    const cell_height = params.canvas.height / params.grid.rows;
    for(let i = 0; i < params.grid.cols; i++){
      for(let j = 0; j < params.grid.rows; j++){
        gridValues.push({
          x: i*cell_width + (cell_width / 2),
          y: j*cell_height + (cell_height / 2)
        })
      }
    }
    console.log('gridValues->', gridValues)
  }

  function setupColors(){
    let chromotome_palettes = tome.getAll();
    for (let i = 0; i < chromotome_palettes.length; i++) {
      let key = chromotome_palettes[i].name;
      color_palettes[key] = new Object(chromotome_palettes[i].colors);
    }
    color_palettes = { ...color_palettes, ...chroma.brewer };
    console.log('chroma.brewer',chroma.brewer)
    console.log(color_palettes,params.color.palette,color_palettes[params.color.palette])
    if(params.color.palette in color_palettes)
      color_machine = chroma.scale(color_palettes[params.color.palette]);
    else
      color_machine = chroma.scale(['black','white']);
  }

  function randomizeColorMachine(){
    let pals = tome.getAll()
    let rand_palette_key = Math.floor(Math.random() * pals.length)
    let new_pal = pals[rand_palette_key]
    color_machine = chroma.scale(new_pal.colors)
    console.log('new_pal ->', new_pal)
  }

  function setupGraphics(){
    canvas = p.createCanvas(params.canvas.width, params.canvas.height);
    canvas.background(params.color.background)
    graphic = p.createGraphics(params.canvas.width, params.canvas.height)
    // p.frameRate(params.draw.framerate)
    graphic.frameRate(params.draw.frame_rate)
    graphic.strokeJoin(p.BEVEL)
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
      // if(draw_index % 10 == 0)
        // incDistRatio();
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

  function setTensionLineColors(){
    const cv = draw_index % params.color.domain / params.color.domain;
    const fill_color = color_machine(cv).rgba()
    fill_color[3] = params.draw.color_alpha * 255;
    params.draw.color_alpha = (params.draw.color_alpha + params.draw.color_alpha_inc) % 1
    if(params.draw.fill){
      graphic.fill(fill_color)
    }else{
      graphic.noFill();
    }
    const stroke_color = color_machine((cv + 0.5) % 1).rgba()
    stroke_color[3] = params.tension_line.color_alpha * 255;
    // graphic.stroke(params.tension_line.outline_color)
    graphic.strokeWeight(params.tension_line.stroke_weight)
    // graphic.stroke(params.tension_line.outline_color)
    graphic.stroke(stroke_color)
  }


  function drawTensionLines(){
    setTensionLineColors();
    if(tension_lines.length != 0){
      let t = tension_lines[tension_lines.length - 1]
      const start_x = darts[t.start_index].x;
      const start_y = darts[t.start_index].y;
      const end_x = darts[t.end_index].x;
      const end_y = darts[t.end_index].y;
      const corner_xa = end_x
      const corner_ya = start_y;
      const corner_xb = start_x
      const corner_yb = end_y;
      const mid_xa = Math.abs(start_x - end_x) / 2
      const mid_ya = Math.abs(start_y - end_y) / 2
      const line = [
        // {x:mid_xa,y:mid_ya},
        {x:corner_xa,y:corner_ya},
        {x:start_x,y:start_y},
        {x:corner_xb,y:corner_yb},
        // {x:end_x,y:end_y},
      ];
      let dr =(params.draw.dart_count % params.draw.smooth_domain) / 
        (params.draw.smooth_domain)
      if(params.tension_line.dist_ratio != 0)
        dr = params.tension_line.dist_ratio;
      graphic.beginShape()
      SmoothLine(
        line,
        params.tension_line.total_iters,
        0,
        dr   
      ).forEach((v)=>graphic.vertex(v.x,v.y));
      graphic.endShape();
    }
  }

  function throwDart(){
    const dim = params.grid.rows * params.grid.cols;
    
    const rand_index_x = Math.floor(Math.random() * dim);
    const rand_index_y = Math.floor(Math.random() * dim);
    
    let dart = {
      // x: gridValues[rand_index_x].x,
      // y: gridValues[rand_index_x].x,
      x: gridValues[grid_index_x].x,
      y: gridValues[grid_index_y].y,
      index: darts.length,
      radius: params.dart.radius
    }
    if(!params.grid.enabled){
      dart.x = Math.random() * params.canvas.width
      dart.y = Math.random() * params.canvas.height
    }
    grid_index_x = (grid_index_x + draw_index) % gridValues.length
    grid_index_y = (grid_index_y + 1) % (gridValues.length)

    darts.push(dart)

    if(darts.length != 1){
      tension_lines.push({
        start_index: darts[darts.length - 2].index,
        end_index: darts[darts.length - 1].index,
        tension: 1
      })

    }
    // params.draw.dart_count = (params.draw.dart_count + 1);
  }



  p.keyPressed = function (event: KeyboardEvent):any{
    console.log(event.key)
    switch(event.key){
      case " ": pause = !pause; break;
      case "a": auto_mode = !auto_mode; break;
      case "d": throwDart(); break;
      case "r": graphic.background(params.color.background); break;
      case "c": randomizeColorMachine(); break;
      case "ArrowRight": incDistRatio(); break;
      case "ArrowLeft": decDistRatio(); break;
      // case "0": p.saveFrames("_", "png", 30, 15); break;
    }
  }

  function incDistRatio(){
    params.tension_line.dist_ratio += params.tension_line.dist_ratio_inc; 
    console.log(params.tension_line.dist_ratio)
  }
  function decDistRatio(){
    params.tension_line.dist_ratio -= params.tension_line.dist_ratio_inc; 
    console.log(params.tension_line.dist_ratio)
  }
}

new p5(sketch)
