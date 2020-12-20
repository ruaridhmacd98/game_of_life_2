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
	  scale: 10,
	  centreOffset: [0, 0],
	  cells: getInitialGrid()
    };
  }

  componentDidMount() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    var game = new Game();
    this.setState({width: canvas.width});
    this.setState({height: canvas.height});
    setInterval(()=>{
	if (this.state.isRunning) {
		this.draw();
		this.setState({cells: game.iterate(this.state.cells)});
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
    [x, y] = this.clientToCell([x, y]);
    this.state.cells.set(x, y, 0);
    this.draw();
  }

  handleWheel(event){
    let scroll = event.deltaY;
	  var newScale = this.state.scale;
	  if(scroll>0){
	    newScale/=0.9;
	  }
	  else if(newScale>1){
	    newScale*=0.9;
	  }
    this.setState({scale: newScale})
    this.draw();
  }

  clientToCell([clientx, clienty]){
    let cellx = Math.floor((clientx - this.state.width/2 - this.state.centreOffset[0]) / this.state.scale);
    let celly = Math.floor((clienty - this.state.height/2 - this.state.centreOffset[1]) / this.state.scale);
    return [cellx, celly];
  }

  cellToClient([x, y]){
	let clientx = Math.floor(x*this.state.scale + this.state.centreOffset[0] + this.state.width/2);
	let clienty = Math.floor(y*this.state.scale + this.state.centreOffset[1] + this.state.height/2);
	return [clientx, clienty];
  }

  draw(){
    let ctx = this.refs.canvas.getContext("2d");
    ctx.fillStyle="#E0E0E0";
    ctx.fillRect(0,0,this.state.width,this.state.height);
    ctx.fillStyle="#000000";
    const coords = this.state.cells.listCells()
    for(var i=0; i<coords.length; i++){
	var x, y
	[x, y] = this.cellToClient(coords[i])
	ctx.fillRect(x, y, 0.9*this.state.scale, 0.9*this.state.scale);
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
        <canvas ref="canvas"
	    onClick={(event) => this.handleClick(event)}
	    onWheel={(event) => this.handleWheel(event)}
	></canvas>
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
