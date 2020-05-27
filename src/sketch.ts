import * as p5 from 'p5'
import * as chroma from 'chroma.ts';
import * as tome from 'chromotome';
import {params} from './params'
import { RingGroup } from './ring_group';
import { Point } from './models';
import { sumPointValues, SmoothLine } from './helpers';

var sketch = function (p: p5) {
  var pause = false;
  var auto = false;
  var draw_weave = false;
  var canvas;
  var graphic;
  var draw_index = 0;
  var ring_group: RingGroup
  var color_machine;

  var color_palettes = {};
  p.setup = function () {
    setupColors();
    setupGraphics();
    setupRingGroup();

  }

  var setupRingGroup = function(){
    ring_group = new RingGroup(graphic, color_machine);
    ring_group.setup();
  }

  p.draw = function () {
    if(!pause){
      if(params.draw.ring_group)
        ring_group.draw();
      if(params.draw.weave && draw_weave)
        drawWeave();
      p.image(graphic, 0, 0)
      draw_index++;
    }
  }

  function drawWeave(){
    let next_jumps:Point[] = [];
    for(let i = 0; i < params.ring_group.count; i++){
      const jump_index = params.weave.pattern[i % params.weave.pattern.length]
      next_jumps.push(ring_group.jump(jump_index));
    }
    const pause_sum = sumPointValues(next_jumps);
    if(pause_sum == -params.weave.pattern.length){
      pause = true;
      setupRingGroup();
    }else{
      next_jumps = SmoothLine(
        [...next_jumps],
        params.weave.smooth.total_iters,
        params.weave.smooth.init_iter,
        params.weave.smooth.dist_ratio,
        params.weave.smooth.lattice,
      );
      graphic.strokeWeight(params.weave.draw.stroke_weight)
      if(params.weave.draw.fill){

        graphic.fill('lightblue')
      }
      else
        graphic.noFill();
      

      graphic.beginShape();
      next_jumps.forEach((next_jump)=>{
        // if(next_jump.value != -1){
        graphic.vertex(
          next_jump.x,
          next_jump.y
        );
        // }
      })
      graphic.endShape(p.CLOSE);
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
    console.log(event.key)
  }
  
}

new p5(sketch)
