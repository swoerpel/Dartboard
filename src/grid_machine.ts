import {params} from './params'

export class GridMachine{
    constructor() {}

    generate(index, x, y, grid){
        // return this.modMax(index, x, y,grid)
        // return this.random(index, x, y,grid)
        return this.randMod(index, x, y,grid)
    }

    modMax(index, x, y, grid){
        return index % grid.max_value;
    }

    random(index, x, y, grid){
        return Math.floor(Math.random() * grid.max_value)
    }

    randMod(index, x, y,grid){
        const mod_values = [
            Math.floor(Math.random() * grid.max_value) + 1,
            Math.floor(Math.random() * grid.max_value) + 1,
            Math.floor(Math.random() * grid.max_value) + 1,
            Math.floor(Math.random() * grid.max_value) + 1,
        ]
            if(x % mod_values[0] == 0)
                return 0
            if(y % mod_values[1] == 0)
                return 1
            if(x % mod_values[2] == 0)
                return 2
            if(y % mod_values[3] == 0)
                return 3
            return 4
    }

}