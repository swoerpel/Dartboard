let len = 4800;
export var params = {
  canvas: {
    width: len*2,
    height:len,
  },

  grid:{
    cols:20*2,
    rows: 20,
    max_value: 6,
    max_value_inc: 1,
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
    toggle_knight_corners: true,
  },

  knight:{
    jump:{
      x: 2,
      y: 1,

      // only toggle knight jump on
      min_x: 1,
      min_y: 1,

      max_x: 2,
      max_y: 2,
    },
    toggle_jump_frequency: 0.01,
    alpha: .1,
    draw_mode: 'bars',
    width: 0.05,
    stroke: 'black'
  },

  weave:{
    queue_length: 12,
    alpha: 1,

    smooth: {
      iter_start: 0,
      iters: 5,
      ratio: .25,
      min: .25,
      max: 1,
      inc: 0.01,
      oss_freq: 0.05,
    },

    width: {
      value: .2,
      min: .2,
      max: 1,
      inc: .1,
      oss_freq: 0.02,
    },

    outline: {
      width: 16,
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
    domain: 6,
    background:'black',
  }

}