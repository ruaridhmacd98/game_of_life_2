import React from 'react';
import Tutorial from './tutorial.js';
import './App.css';

class Canvas extends React.Component {
  constructor() {
    super()
    this.state = {
	  width: null,
	  height: null,
	  ctx: null,
	  isRunning: true,
    };
  }

  componentDidMount() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
    ctx.canvas.addEventListener('mousedown', onclick);
    var game = new Game();
    var cells = getInitialGrid();
    this.setState({width: canvas.width});
    this.setState({height: canvas.height});
    this.draw(cells, ctx)
    setInterval(()=>{
	if (this.state.isRunning) {
		cells = game.iterate(cells);
		this.draw(cells, ctx)
	}
     }, 250)
     }

  updateRunning = () => {
    this.setState({isRunning: !this.state.isRunning})
  }

  handleClick(event){
	let ctx = this.refs.canvas.getContext("2d");
 	let x = event.clientX - ctx.canvas.offsetLeft;
	let y = event.clientY - ctx.canvas.offsetTop;
  }

  draw(cells, ctx){
    ctx.fillStyle="#E0E0E0";
    ctx.fillRect(0,0,this.state.width,this.state.height);
    ctx.fillStyle="#000000";
    const coords = cells.listCells()
    for(var i=0; i<coords.length; i++){
	var x, y
	[x, y] = coords[i]
	ctx.fillRect(x*10+31 , y*10+31  ,8,8);
    }
  }

  render (){
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <body>
	<Tutorial/>
	<button className="button" onClick={this.updateRunning}>
	    {this.state.isRunning ? <div>Stop</div>
                            : <div>Start</div>}
	</button>
        <canvas ref="canvas" onClick={this.handleClick}></canvas>
        </body>
      </div>
    );
  }
}

export default Canvas;


class Game {
  iterate(grid){
    let counts = this.getCounts(grid)
    let newGrid = this.generateNewGrid(counts, grid)
    return newGrid;
  }

  getCounts(grid) {
    console.log('intial', grid.state.grid)
    let counts = new Grid();
    const cells = grid.listCells()
    for(var c=0; c<cells.length; c++){
	var x, y
	[x, y] = cells[c]
	for(let i=-1; i<2; i++){
	   for(let j =-1; j<2; j++){
		if(!counts.has(x+j, y+i)){
		  counts.set(x+j, y+i, 1);
		} else {
		  var count = counts.get(x+j, y+i)
		  counts.set(x+j, y+i, count+1);
		}
	   }
	}
    }
    console.log('counts', counts.state.grid)
    return counts;
  }

  generateNewGrid(counts, oldGrid){
    let buffer = new Grid();
    const cells = counts.listCells()
    for(var i=0; i<cells.length; i++){
	var x, y;
	[x, y] = cells[i];
	var count = counts.get(x, y);
        if(count===3){
	   buffer.set(x, y, 0);
        }
        if(count===4){
          if(oldGrid.has(x, y)){
	     buffer.set(x, y, 0);
          }
        }
    }
    return buffer;
  }
}

function getInitialGrid() {
  const grid = new Grid();
      grid.set(3, 0, 0);
      grid.set(3, 1, 0);
      grid.set(3, 2, 0);
      grid.set(1, 1, 0);
      grid.set(2, 2, 0);
  return grid;
}


class Grid {
  constructor() {
    this.state = {
      grid: new Map(),
    }
  }

  set(x, y, value){
   if(!this.state.grid.has(y)){
     this.state.grid.set(y, new Map());
   }
   this.state.grid.get(y).set(x,value);
  }

  has(x, y){
    var res = false
    if(this.state.grid.has(y)){res = this.state.grid.get(y).has(x)}
    return res
  }

  get(x, y){return this.state.grid.get(y).get(x)}

  listCells(){
    var output = []
    this.state.grid.forEach((row, y, counts)=>{
      row.forEach((count, x, row)=>{
	output.push([x, y])
      })
    })
    return output;
  }
}
