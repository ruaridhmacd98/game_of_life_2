import Grid from './grid.js';


export default class Game {
  iterate(grid){
    let counts = this.getCounts(grid)
    let newGrid = this.generateNewGrid(counts, grid)
    return newGrid;
  }

  getCounts(grid) {
    let counts = new Grid();
    const cells = grid.listCells()
    for(var c=0; c<cells.length; c++){
	var x, y
	[x, y] = cells[c]
	let player = grid.get(x, y)
	for(let i=-1; i<2; i++){
	   for(let j =-1; j<2; j++){
		if(i===0 & j===0){continue}
		let xtmp=x+j, ytmp=y+i;
		if(!counts.has(xtmp, ytmp)){
		  counts.set(xtmp, ytmp, {});
		}
		if(!(player in counts.get(xtmp, ytmp))){
		  counts.get(xtmp, ytmp)[player] = 0;
		}
		counts.get(xtmp, ytmp)[player]++;
	   }
	}
    }
    return counts;
  }

  generateNewGrid(counts, oldGrid){
    let buffer = new Grid();
    const cells = counts.listCells()
    for(var i=0; i<cells.length; i++){
	var x, y;
	[x, y] = cells[i];
	var playerCounts = counts.get(x, y);
	const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
	const maxValue = obj => Object.keys(obj).reduce(function(a, b){ return obj[a] > obj[b] ? a : b });
	let total = sumValues(playerCounts)
        if(oldGrid.has(x, y)){
          if(total===2 | total === 3){
	    buffer.set(x, y, oldGrid.get(x, y));
	  }
        }
	else if(total===3){
	     buffer.set(x, y, parseInt(maxValue(playerCounts)));
        }
    }
    return buffer;
  }
}

