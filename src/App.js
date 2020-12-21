import React from 'react';
import Tutorial from './tutorial.js';
import './App.css';


const COLOURS = {
  1: '#0000FF',
  2: '#FF0000',
}

class Canvas extends React.Component {
  constructor() {
    super()
    this.state = {
	  width: null,
	  height: null,
	  ctx: null,
	  isRunning: true,
	  isDragging: false,
	  mousePosition: [0, 0],
	  scale: 10,
	  centreOffset: [0, 0],
	  cells: getInitialGrid()
    };
  }

  componentDidMount() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight * 0.9;
    var game = new Game();
    this.setState({width: canvas.width});
    this.setState({height: canvas.height});
    setInterval(()=>{
	this.draw();
	if (this.state.isRunning) {
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
    this.state.cells.set(x, y, 1);
    this.draw();
  }

  handleWheel(event){
    let scroll = event.deltaY;
	  let newScale = this.state.scale;
	  let [newX, newY] = this.state.centreOffset;
	  if(scroll>0){
	    newScale/=0.9;
	    newX/=0.9;
	    newY/=0.9;
	  }
	  else if(newScale>1){
	    newScale*=0.9;
	    newX*=0.9;
	    newY*=0.9;
	  }
    this.setState({scale: newScale, centreOffset: [newX, newY]})
    this.draw();
  }

  handleMouseDown(event){
   this.setState({isDragging: true, mousePosition: [event.clientX, event.clientY]});
  }

  handleMouseUp(event){
   this.setState({isDragging: false});
  }

  handleMouseMove(event){
    if(this.state.isDragging){
      let [newX, newY] = this.state.centreOffset;
      newX += event.clientX - this.state.mousePosition[0];
      newY += event.clientY - this.state.mousePosition[1];
      this.setState({centreOffset: [newX, newY], mousePosition: [event.clientX, event.clientY]});
      this.draw();
    }
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
    const coords = this.state.cells.listCells()
    for(var i=0; i<coords.length; i++){
	let x, y, clientx, clienty;
	[x, y] = coords[i];
	let player = this.state.cells.get(x, y);
	let colour = COLOURS[player];
	[clientx, clienty] = this.cellToClient([x, y]);
	ctx.fillStyle=colour;
	ctx.fillRect(clientx, clienty, 0.9*this.state.scale, 0.9*this.state.scale);
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
	    onMouseDown={(event) => this.handleMouseDown(event)}
	    onMouseUp={(event) => this.handleMouseUp(event)}
	    onMouseMove={(event) => this.handleMouseMove(event)}
	></canvas>
        </body>
      </div>
    );
  }
}

export default Canvas;


export class Game {
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
	let total = sumValues(playerCounts)
        if(oldGrid.has(x, y)){
          if(total===2 | total === 4){
	    buffer.set(x, y, 1);
	  }
        }
	else if(total===3){
	     buffer.set(x, y, 1);
        }
    }
    return buffer;
  }
}

function getInitialGrid() {
  const grid = new Grid();
      grid.set(3, 0, 1);
      grid.set(3, 1, 1);
      grid.set(3, 2, 1);
      grid.set(4, 1, 1);
      grid.set(2, 2, 1);
      grid.set(18, 0, 2);
      grid.set(18, 1, 2);
      grid.set(18, 2, 2);
      grid.set(19, 1, 2);
      grid.set(17, 2, 2);
  return grid;
}


export class Grid {
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
