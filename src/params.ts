let len = 4800;
let rings = 120;
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
    count: rings,
    stroke_weight:[0.005], 
    spokes: Array.from(Array(rings).keys()).map((n) => n + 2), 
    // radius:[0.1,.11,.12,.13,.14,.15,.16,.17,.18,.19,.2,.21],    
    radius: Array.from(Array(rings).keys()).map((n) => n / rings),
    draw:[true],
    point:{
      order:['linear'],
      value:{
        offset: [0],
        scale: 1,
        domain: 31
      },
    },
  },

  weave:{
    pattern: Array.from(Array(rings).keys()),
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