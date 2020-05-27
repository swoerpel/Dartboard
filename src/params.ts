let len = 2400;
export var params = {
  canvas: {
    width: len,
    height:len,
  },

  draw:{
    weave: true,
    ring_group: true,
  },

  ring_group:{
    layout: 'linear',
    draw_origins: true,
    count: 3,
    stroke_weight:[0.03], 
    spokes: [8,8,8], 
    radius:[0.1],    
    draw:[true],
    point:{
      order:['linear'],
      value:{
        offset: [-1,0,1],
        scale: 1,
        domain: 31
      },
    },
    jump:{
      rule: 'min'
    }
  },

  weave:{
    pattern: [0,1,2],
    stroke_weight: 10
  },


  color: {
    const: false,
    const_color: 'white',
    boundary_ring: 'white',
    weave: 'orange',
    // palette: 'hilda02',
    // palette: 'tundra4',
    // palette: 'winter-night',
    // palette: 'cc232',
    // palette: 'RdBu',
    // palette: 'Viridis',
    palette: 'Spectral',
    // palette: 'lemon_citrus',
    // palette: ['white','white'],
    domain: 40,
    background:'black',
  }

}