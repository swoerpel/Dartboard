let len = 2400;
export var params = {
  canvas: {
    width: len * 2,
    height:len,
  },

  grid:{
    cols:8,
    rows: 4,
    max_value: 9,
    max_value_inc: 1,
    random: true, // cell assignment values are random
  },

  draw:{
    knight: false,
    weave: true,
    jump_options: false,
    pause_on_trap: false,
    inc_max_grid_value_on_trap: false,
    oscillate_smoothing: false,
    oscillate_weave_width: true,
    toggle_knight_jump: false,
    
  },

  knight:{
    start:'start',
    jump:{
      x: 1,
      y: 1,

      // only toggle knight jump on
      min_x: 2,
      min_y: 1,

      max_x: 4,
      max_y: 4,
    },
    toggle_jump_frequency: 0.01,
    alpha: .1,
    draw_mode: 'bars',
    width: 0.05,
    stroke: 'black'
  },

  weave:{
    queue_length: 5,
    alpha: 1,

    smooth: {
      oss_freq: 0.25,
      iter_start: 0,
      iters: 8,
      ratio: 0.25,
      min: 0,
      max: .25,
      inc: 0.05
    },

    width: {
      value: .1,
      min: .1,
      max: .9,
      inc: .1,
      oss_freq: 0.05,
    },

    outline: {
      width: 4,
      color: 'black',
    },

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
    // palette: ['black','red','yellow','blue'],
    domain: 20,
    background:'black',
  }

}