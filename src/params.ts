let len = 2800;
export var params = {
  canvas: {
    width: len * 2,
    height:len,
  },

  grid:{
    cols: 32*2,
    rows: 16*2,
    max_value: 30,
  },

  draw:{
    knight: false,
    weave: true,
    jump_options: false,
    pause_on_trap: false,
  },

  knight:{
    jump_x: 1,
    jump_y: 1,
    alpha: .1,
    draw_mode: 'bars',
    stroke_cell_ratio: 0.05,
    stroke: 'black'
  },

  weave:{
    queue_length: 3,
    smooth_iters: 8,
    smooth_iter_start: 0,
    smooth_dist_ratio: .25,
    smooth_dist_ratio_inc: 0.005,
    alpha: 1,
    stroke_cell_ratio: Math.sqrt(2),
  },

  jump_options:{
    alpha: 0.05,
    shape: 'circle',
    radius: 0.25,
  },

  color: {
    const: false,
    const_color: 'white',
    palette: 'hilda02',
    // palette: 'tundra4',
    // palette: 'winter-night',
    // palette: 'cc232',
    // palette: 'RdBu',
    // palette: 'Viridis',
    // palette: 'Spectral',
    // palette: 'lemon_citrus',
    domain: 12,
    background:'black',
  }

}