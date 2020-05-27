let len = 2400;
let rings = 120;
let auto = Array.from(Array(rings).keys()).map((n) => n + 2)
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
    layout: 'concentric',
    draw_origins: true,
    count: 4,
    stroke_weight:[0.01], 
    spokes: [8],
    radius:[.2,.3,.4,.5],    
    draw:[true],
    point:{
      order:['linear'],
      value:{
        offset: [0,4,0,3],
        scale: 1,
        domain: 32
      },
    },
  },

  weave:{
    pattern: [0,1,2,3,4,5],
    smooth:{
      total_iters: 8,
      init_iter: 0,
      dist_ratio: .25,
      lattice: true,
    },
    draw:{
      fill: false,
      alpha: 1,
      stroke_weight: 10,
      stroke: 'white'
    }
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