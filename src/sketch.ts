import * as p5 from 'p5'
import * as chroma from 'chroma.ts';
import * as tome from 'chromotome';
import {params} from './params'
import { Weave } from './weave';

var sketch = function (p: p5) {
  var pause = false;
  var jump = false;
  var auto = false;
  var canvas;
  var graphic;
  var weave: Weave;
  var draw_index = 0;
  var color_machine;
  var color_palettes = {};
  p.setup = function () {
    setupColors();
    setupGraphics();
    setupWeave();
  }

  function setupWeave(){
    weave = new Weave(graphic, color_machine);
    weave.RefreshKnight();
    weave.RefreshGrid();
  }

  p.draw = function () {
    if(!pause){
      if(auto || jump){
        if(!weave.Jump()){
          console.log("knight trapped")
          weave.RefreshGrid();
          if(params.draw.pause_on_trap)
            pause = true;
        }
        jump = false;
      }
      p.image(graphic, 0, 0)
      draw_index++;
    }
  }


  function setupColors(){
    let chromotome_palettes = tome.getAll();
    for (let i = 0; i < chromotome_palettes.length; i++) {
      let key = chromotome_palettes[i].name;
      color_palettes[key] = new Object(chromotome_palettes[i].colors);
    }
    color_palettes = { ...color_palettes, ...chroma.brewer };
    console.log('chroma.brewer',chroma.brewer)
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
    weave.color_machine = color_machine;
    console.log('new_pal ->', new_pal)
  }

  function setupGraphics(){
    canvas = p.createCanvas(params.canvas.width, params.canvas.height);
    canvas.background(params.color.background)
    graphic = p.createGraphics(params.canvas.width, params.canvas.height)
    graphic.strokeJoin(p.BEVEL)
  }

  p.keyPressed = function (){
    switch(event.key){
      case " ": pause = !pause; break;
      case "a": auto = !auto; break;
      case "j": jump = true; break;
      case "r": graphic.background(params.color.background); break;
      case "c": randomizeColorMachine(); break;
      case "ArrowRight":modifySmoothRatio(true); break;
      case "ArrowLeft":modifySmoothRatio(false); break;
    }
  }

  function modifySmoothRatio(inc){
    if(inc)
      params.weave.smooth_dist_ratio += params.weave.smooth_dist_ratio_inc
    else
      params.weave.smooth_dist_ratio -= params.weave.smooth_dist_ratio_inc
    console.log(params.weave.smooth_dist_ratio)
  }
  
}

new p5(sketch)
