let len = 6000;
export var params = {
  canvas: {
    width: len,
    height:len,
  },

  grid:{
    cols:24,
    rows: 24,
    max_value: 20,
    max_value_inc: 1,
    population_mode: 'A'
  },

  draw:{
    knight: false,
    weave: true,
    jump_options: true,
    pause_on_trap: false,
    pause_on_min_weave_width: false,
    inc_max_grid_value_on_trap: true,
    oscillate_smoothing: false,
    oscillate_weave_width: true,
    oscillate_weave_step: false, // experimental
    oscillate_jump_option_radius: true,
    toggle_knight_jump: false,
    toggle_knight_corners: true,
  },

  knight:{
    jump:{
      x: 2,
      y: 1,

      // only toggle knight jump on
      min_x: 1,
      min_y: 1,

      max_x: 3,
      max_y: 3,
    },
    toggle_jump_frequency: 0.01,
    alpha: .1,
    draw_mode: 'bars',
    width: 0.05,
    stroke: 'black'
  },

  weave:{
    queue_length: 8,
    alpha: 1,

    smooth: {
      iter_start: 0,
      iters: 5,
      ratio: .25,
      min: .25,
      max: 1,
      inc: 0.01,
      oss_freq: 0.2,
    },

    width: {
      value: .1,
      min: .1,
      max: .6,
      inc: .1,
      oss_freq: 0.05,
    },
 
    //experimental
    step: {
      low: 1,
      high: 4,
    },

    outline: {
      width: 0.05,
      color: 'black',
    },

    color_domain: 6,
    // color_mode: 'const'
    color_mode: 'step'
    // color_mode: 'horizontal'
    // color_mode: 'vertical'
    // color_mode: 'diagonal_A'
  },

  jump_options:{
    alpha: 0.05,
    shape: 'circle',
     // makes dots appear on center 
     // of weave intersections
    offset: false,
    radius: { // random with quantize param
      min: 1,
      max: 4,
      roundTo: 1,
    },
    draw_probability:0.01,
    color_domain: 6,
    // color_mode: 'const'
    // color_mode: 'step'
    color_mode: 'horizontal',
    // color_mode: 'vertical'

    outline: {
      width: 0,
      color: 'black',
    }
  },

  color: {
    const: true,
    const_color: 'blue',
    palette: 'hilda02',
    // palette: 'tundra4',
    // palette: 'winter-night',
    // palette: 'cc232',
    // palette: 'RdBu',
    // palette: 'Viridis',
    // palette: 'Spectral',
    // palette: 'lemon_citrus',
    // palette: ['black','red','yellow','blue'],
    domain: 12,
    background:'black',
  }

}