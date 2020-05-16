let len = 4800;
export var params = {
  canvas: {
    width: len,
    height:len,
  },

  draw:{
    darts: false,
    tension_lines: true,
    fill: true,
    color_alpha: .3,
    color_alpha_inc: 0.01,
    dart_count: 0,
    smooth_domain: 100,
    frame_rate: 30,
  },

  
  grid:{
    cols: 80,
    rows: 8,
    enabled: false,
  },

  dart:{
    radius: 24,
    stroke_weight: 100,
    fill_color: 'white',
    border_color: 'blue',
  },

  tension_line:{
    stroke_weight: 2,
    color_alpha: 1,
    outline_color: 'white',
    total_iters: 1,
    dist_ratio: .25,
    // dist_ratio: .97,
    // dist_ratio: 1.05,
    dist_ratio_inc: 0.01,
  },

  color: {
    palette: 'RdYlGn',
    // palette: 'Viridis',
    // palette: 'Spectral',
    // palette: 'lemon_citrus',
    def_palette: 'Spectral',
    domain: 5,
    background:'black',
  }

}