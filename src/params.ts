let len = 2400;
export var params = {
  canvas: {
    width: len,
    height:len,
  },

  grid:{
    cols: 16,
    rows: 16,
    max_value: 30,
  },

  draw:{
    knight: false,
    weave: true,
    jump_options: false,
  },

  knight:{
    jump_x: 2,
    jump_y: 1,
  },

  weave:{
    queue_length: 3,
    smooth_iters: 8,
    smooth_iter_start: 0,
    smooth_dist_ratio: 0.25,
    alpha: 0.5,
    stroke_weight: 40,
  },

  jump_options:{
    alpha: 0.5
  },

  color: {
    // palette: 'RdYlGn',
    // palette: 'Viridis',
    palette: 'Spectral',
    // palette: 'lemon_citrus',
    def_palette: 'Spectral',
    domain: 50,
    background:'black',
  }

}