let len = 4800;
export var params = {
  canvas: {
    width: len* 2,
    height:len,
  },

  grid:{
    cols: 32 * 2,
    rows: 32,
    max_value: 4,
    max_value_inc: 1,
    random: false,
  },

  draw:{
    knight: false,
    weave: true,
    jump_options: false,
    pause_on_trap: false,
    inc_max_grid_value_on_trap: true,
    oscillate_smoothing: false,
    oscillate_stroke_cell_ratio: true,
    toggle_knight_jump: false,
    
  },

  knight:{
    start:'center',
    jump:{
      x: 1,
      y: 1,
      min_x: 1,
      max_x: 4,
      min_y: 1,
      max_y: 4,
    },
    toggle_jump_frequency: 0.01,
    alpha: .1,
    draw_mode: 'bars',
    stroke_cell_ratio: 0.05,
    stroke: 'black'
  },

  

  weave:{
    queue_length: 6,
    smooth_oscillation_frequency: 0.25,
    smooth_iters: 8,
    smooth_iter_start: 0,
    
    smooth_dist_ratio: .25,
    smooth_dist_min: 0,
    smooth_dist_max: .49,
    smooth_dist_ratio_inc: 0.001,
    alpha: 1,
    stroke_cell_ratio: .05,
    stroke_cell_ratio_min: .05,
    stroke_cell_ratio_max: 1,
    stroke_cell_ratio_inc: 0.05,
    stroke_cell_oscillation_frequency: 0.1,
  },

  jump_options:{
    alpha: 0.05,
    shape: 'circle',
    radius: 0.25,
  },

  color: {
    const: false,
    const_color: 'white',
    // palette: 'hilda02',
    // palette: 'tundra4',
    // palette: 'winter-night',
    // palette: 'cc232',
    // palette: 'RdBu',
    // palette: 'Viridis',
    // palette: 'Spectral',
    // palette: 'lemon_citrus',
    palette: ['white,black'],
    domain: 2,
    background:'black',
  }

}