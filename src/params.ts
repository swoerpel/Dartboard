let len = 2400;
export var params = {
  canvas: {
    width: len,
    height:len,
  },

  draw:{
    clock: true,
    boundary_ring: true,
    weave: true,
    inner_rings: true,
  },

  
  clock:{

  },


  weave:{
    inner_connections: 1,
    point_size: 0.05,
    // inner_ring_index: 0, //remove later
  },

  boundary_ring:{
    diameter: 1,
    spokes: 8,
    stroke_weight: 5,
    color: 'white',
  },


  inner_rings:[
    {
      diameter: .5,
      spokes: 8,
      stroke_weight: 5,
      color:'blue'
    },

  ],



  color: {
    const: false,
    const_color: 'white',
    boundary_ring: 'white',
    weave: 'orange',
    // palette: 'hilda02',
    // palette: 'tundra4',
    palette: 'winter-night',
    // palette: 'cc232',
    // palette: 'RdBu',
    // palette: 'Viridis',
    // palette: 'Spectral',
    // palette: 'lemon_citrus',
    // palette: ['black','red','yellow','blue'],
    domain: 10,
    background:'black',
  }

}