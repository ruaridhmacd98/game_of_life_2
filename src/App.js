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
    this.setState({width: canvas.width});
    this.setState({height: canvas.height});
    setInterval(()=>{
	if (this.state.isRunning) {
		let cells = game.iterate();
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
    cells.forEach((row,y,grid)=>{
      row.forEach((cell_state,x,row)=>{
	ctx.fillRect(y*10+31 , x*10+31  ,8,8);
      })
    })
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
  constructor() {
    this.state = {
      grid: this.getInitialGrid(),
    };
  }

  iterate(){
    console.log(this.state.grid)
    this.updateGrid();
    return this.state.grid;
  }

  updateGrid(){
    let counts = this.getCounts()
    let newGrid = this.generateNewGrid(counts)
    this.state.grid = newGrid
  }

  getCounts() {
    let counts = new Map();
    this.state.grid.forEach((row,y,grid)=>{
      row.forEach((cell_state,x,row)=>{
	for(let i=-1; i<2; i++){
	   for(let j =-1; j<2; j++){
		if(!counts.has(y+i)){
		   counts.set(y+i, new Map())
		}
		if(!counts.get(y+i).has(x+j)){
		   counts.get(y+i).set(x+j, 0);
		}
		counts.get(y+i).set(x+j, counts.get(y+i).get(x+j)+1);
	   }
	}
    })
    })
    return counts;
  }

  generateNewGrid(counts){
     let buffer = new Map();
     counts.forEach((row, y, counts)=>{
	row.forEach((count, x, row)=>{
		if(count===3){
		   if(!buffer.has(y)){
			   buffer.set(y, new Map());
		   }
		   buffer.get(y).set(x,0);
		}
		if(count===4){
		  if(this.state.grid.get(y).has(x)){
		     if(!buffer.has(y)){
			   buffer.set(y, new Map());
		     }
		     buffer.get(y).set(x,0);
		  }
		}
      })
     })
     return buffer;
  }

  getInitialGrid() {
    const grid = new Map();
	let row= new Map();
        row.set(1,0);
	grid.set(1,row);
	row = new Map();
	row.set(2,0)
	grid.set(2,row);
	row = new Map();
	row.set(0,0)
	row.set(1,0)
	row.set(2,0)
	grid.set(3,row);
    return grid;
  }
}
