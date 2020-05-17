let len = 4800;
export var params = {
  canvas: {
    width: len,
    height:len,
  },

  grid:{
    cols: 4,
    rows: 4,
    max_value: 30,
  },

  draw:{
    knight: true,
    weave: true,
    jump_options: false,
    pause_on_trap: true,
  },

  knight:{
    jump_x: 2,
    jump_y: 1,
    alpha: 1,
    draw_mode: 'bars',

  },

  weave:{
    queue_length: 3,
    smooth_iters: 8,
    smooth_iter_start: 0,
    smooth_dist_ratio: 1,
    smooth_dist_ratio_inc: 0.005,
    alpha: .5,
    stroke_cell_ratio: .25,
  },

  jump_options:{
    alpha: 0.05,
    shape: 'rect',
    radius: 0.1,
  },

  color: {
    const: false,
    const_color: 'black',
    // palette: 'RdBu',
    // palette: 'Viridis',
    palette: 'Spectral',
    // palette: 'lemon_citrus',
    domain: 50,
    background:'white',
  }

}