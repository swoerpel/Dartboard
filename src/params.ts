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
    knight: false,
    weave: true,
    jump_options: true,
  },

  knight:{
    jump_x: 2,
    jump_y: 1,
    alpha: 0.1
  },

  weave:{
    queue_length: 3,
    smooth_iters: 8,
    smooth_iter_start: 0,
    smooth_dist_ratio: .25,
    smooth_dist_ratio_inc: 0.005,
    alpha: 1,
    stroke_weight: 12,
  },

  jump_options:{
    alpha: 0.05,
    shape: 'rect',
    radius: 0.1,
  },

  color: {
    palette: 'RdBu',
    // palette: 'Viridis',
    // palette: 'Spectral',
    // palette: 'lemon_citrus',
    def_palette: 'Spectral',
    domain: 50,
    background:'black',
  }

}