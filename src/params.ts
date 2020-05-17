let len = 2400;
export var params = {
  canvas: {
    width: len,
    height:len,
  },

  draw:{
    jump_options: false,
    jump_options_alpha: 0.5,

    knight: true,
  },

  
  grid:{
    cols: 8,
    rows: 8,
    max_value: 30,
  },

  knight:{
    jump_x: 2,
    jump_y: 1,
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