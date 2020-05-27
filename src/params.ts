let len = 2400;
export var params = {
  canvas: {
    width: len*1.5,
    height:len,
  },

  draw:{
    weave: true,
    ring_group: true,
  },

  ring_group:{
    layout: 'linear',
    draw_origins: true,
    count: 5,
    stroke_weight:[0.03], 
    spokes: [6], 
    radius:[0.15],    
    draw:[true],
    point:{
      order:['linear'],
      value:{
        offset: [0,2,4,6],
        scale: 1,
        domain: 31
      },
    },
  },

  weave:{
    pattern: [0,1,2,3,4,],
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