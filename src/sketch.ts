import * as p5 from 'p5'
import * as chroma from 'chroma.ts';
import * as tome from 'chromotome';
import {params} from './params'
import { Clock } from './clock';

var sketch = function (p: p5) {
  var pause = false;
  var draw_weave = false;
  var auto = false;
  var canvas;
  var graphic;
  var clock: Clock;
  var draw_index = 0;
  var color_machine;
  
  var color_palettes = {};
  p.setup = function () {
    setupColors();
    setupGraphics();
    setupClock();
  }

  function setupClock(){
    clock = new Clock(graphic, color_machine);
    clock.setupRings();
  }

  function modifyWeaveStrokeWeight(){
    if(draw_index % params.weave.sw.freq)
      params.weave.sw.init += params.weave.sw.step
    if (params.weave.sw.init > params.weave.sw.max)
      params.weave.sw.init = params.weave.sw.min
  }

  p.draw = function () {
    if(!pause){
      if(params.draw.boundary_ring)
        clock.drawBoundaryRing();
      if(params.draw.inner_rings)
        clock.drawInnerRings();
      if(params.draw.weave && draw_weave){
        if(!auto)
          draw_weave = false;
        if(params.draw.toggle_weave_stroke_weight)
          modifyWeaveStrokeWeight()
        clock.drawWeave();
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
    if(Array.isArray(params.color.palette)){
      color_machine = chroma.scale(params.color.palette);
    }else{
      if(params.color.palette in color_palettes)
        color_machine = chroma.scale(color_palettes[params.color.palette]);
      else
        color_machine = chroma.scale(['black','white']);
    }
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
    graphic.strokeJoin(p.BEVEL)
  }

  p.keyPressed = function (){
    switch(event.key){
      case " ": pause = !pause; break;
      case "d": draw_weave = true; break;
      case "a": auto = !auto; break;
      case "ArrowRight": params.boundary_ring.spokes += 1; break;
      case "ArrowLeft": params.boundary_ring.spokes -= 1; break;
      case "g": graphic.background(params.color.background); break;
      case "c": randomizeColorMachine(); break;
    }
    console.log(params.boundary_ring.spokes)
    console.log(event.key)
  }
  
}

new p5(sketch)
