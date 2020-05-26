let len = 4800;
export var params = {
  canvas: {
    width: len,
    height:len,
  },

  draw:{
    clock: true,
    boundary_ring: true,
    weave: true,
    inner_rings: false,
    toggle_weave_stroke_weight: false,
  },

  weave:{
    inner_connections: 1,
    point_size: 0.01,
    dist_ratio: .25,
    smooth_iters: 8,
    sw:{
      init: 4,
      min: 50,
      max: 151,
      step: 50,
      freq: 80 ,
    },
    alpha: 1
    // inner_ring_index: 0, //remove later
  },

  boundary_ring:{
    diameter: .9,
    spokes: 7,
    stroke_weight:20,
    color: 'white',
  },


  inner_rings:[
    {
      diameter: .5,
      spokes: 16,
      stroke_weight: 20,
      color:'white'
    },
  ],



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
    // palette: 'Spectral',
    // palette: 'lemon_citrus',
    palette: ['black','black'],
    domain: 40,
    background:'white',
  }

}