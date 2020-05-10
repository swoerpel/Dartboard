
export var params = {
  canvas: {
    width: 2400,
    height:2400,
  },

  draw:{
    darts: true,
    tension_lines: true,
    fill: false,
    outline: true,
    alpha: 0.2,
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
    stroke_weight: 24,
    color: 'white',
  },

  color: {
    palette: 'Spectral',
    // palette: 'lemon_citrus',
    // def_palette: 'Spectral',
    domain: 120,
    background:'black',
  }

}