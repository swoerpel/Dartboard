
export var params = {
  canvas: {
    width: 2400,
    height:2400,
    // width: 4800,
    // height:4800,
  },

  draw:{
    darts: false,
    tension_lines: true,
    fill: true,
    color_alpha: 0.3,
    dart_count: 0,
    smooth_domain: 100,
  },

  grid:{
    rows: 8,
    cols: 8
  },

  dart:{
    radius: 24,
    stroke_weight: 100,
    fill_color: 'white',
    border_color: 'blue',
  },

  tension_line:{
    stroke_weight: 0,
    color_alpha: 0.01,
    outline_color: 'white',
    total_iters: 8,
    dist_ratio: 0.25,
    dist_ratio_inc: -0.05,
  },

  color: {
    palette: 'Spectral',
    // palette: 'lemon_citrus',
    // def_palette: 'Spectral',
    domain: 40,
    background:'black',
  }

}