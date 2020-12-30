export default class Grid {
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
