
export var params = {
  canvas: {
    width: 4800,
    height:4800,
  },

  draw:{
    darts: false,
    tension_lines: true,
    fill: true,
    outline: false,
    alpha: 0.1,
    dart_count: 0,
    smooth_domain: 100,
  },

  grid:{
    rows: 4,
    cols: 4
  },

  dart:{
    radius: 24,
    stroke_weight: 100,
    fill_color: 'white',
    border_color: 'blue',
  },

  tension_line:{
    stroke_weight: 1,
    color: 'white',
    color_alpha: 0.01,
    outline_color: '',
    total_iters: 8,
    dist_ratio: 1,
    // dist_ratio: 0.97,
    dist_ratio_inc: -0.001,
  },

  color: {
    palette: 'Spectral',
    // palette: 'lemon_citrus',
    // def_palette: 'Spectral',
    domain: 600,
    background:'black',
  }

}