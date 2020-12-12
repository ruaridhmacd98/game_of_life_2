import React from 'react';
import Tutorial from './tutorial.js';

class Canvas extends React.Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.fillRect(50,50,2000,50);
    var game = new Game();
    game.iterate();
  }
  render (){
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <body>
	<Tutorial/>
        <canvas ref="canvas" width="200" height="100"></canvas>
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
                  interval: 100,
                  isRunning: false,
      drawer: Canvas,
      };
    }

    iterate(){
      this.updateGrid();
      //this.drawer.draw();
    }

    updateGrid(){
      let buffer = new Map();
      this.state.grid.forEach((row,y,grid)=>{
          row.forEach((cell_state,x,row)=>{
          console.log(x, y, cell_state);
            console.log(grid.get(y-1))
            if(buffer.get(y-1)){
              buffer.get(y-1).get(x-1);
            }
            else{
              console.log("meh");
            }

        }
        )
      }
    )}



    getInitialGrid() {
  const grid = new Map();
      for(let i=0; i<2; i++){
      let row= new Map();
      row.set(1,0);
      row.set(2,0);
      grid.set(i,row);
      }
  return grid;
    }
}
