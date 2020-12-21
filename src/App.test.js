import {Game, Grid} from './App';

test('get new grid simple', () => {
  /*
   0 0 0 0
   0 0 0 0
   0 1 0 0
   0 0 0 0

   0 0 0 0
   1 1 1 0
   1 0 1 0
   1 1 1 0

  */
  let grid = new Grid();
  grid.set(1, 2, 1)
  let game = new Game();
  let expected = new Grid();
  expected.set(0, 1, {1: 1})
  expected.set(0, 2, {1: 1})
  expected.set(0, 3, {1: 1})
  expected.set(1, 1, {1: 1})
  expected.set(1, 3, {1: 1})
  expected.set(2, 1, {1: 1})
  expected.set(2, 2, {1: 1})
  expected.set(2, 3, {1: 1})
  let counts = game.getCounts(grid)
  expect(counts).toStrictEqual(expected);
  let newGrid = game.generateNewGrid(counts, grid)
  expected = new Grid();
  expect(newGrid).toStrictEqual(expected);
});


test('get new grid more complex', () => {
  /*
   0 0 0 0    0 1 1 1   0 0 0 0
   0 0 1 0    0 2 1 2   0 0 0 0
   0 0 1 0    0 3 2 3   0 1 1 1
   0 0 1 0    0 2 1 2   0 0 0 0
   0 0 0 0    0 1 1 1   0 0 0 0

  */
  let grid = new Grid();
  grid.set(2, 1, 1)
  grid.set(2, 2, 1)
  grid.set(2, 3, 1)
  let game = new Game();
  let expected = new Grid();
  expected.set(1, 0, {1: 1})
  expected.set(1, 1, {1: 2})
  expected.set(1, 2, {1: 3})
  expected.set(1, 3, {1: 2})
  expected.set(1, 4, {1: 1})
  expected.set(2, 0, {1: 1})
  expected.set(2, 1, {1: 1})
  expected.set(2, 2, {1: 2})
  expected.set(2, 3, {1: 1})
  expected.set(2, 4, {1: 1})
  expected.set(3, 0, {1: 1})
  expected.set(3, 1, {1: 2})
  expected.set(3, 2, {1: 3})
  expected.set(3, 3, {1: 2})
  expected.set(3, 4, {1: 1})
  let counts = game.getCounts(grid)
  expect(counts).toStrictEqual(expected);
  let newGrid = game.generateNewGrid(counts, grid)
  expected = new Grid();
  expected.set(1, 2, 1)
  expected.set(2, 2, 1)
  expected.set(3, 2, 1)
  expect(newGrid).toStrictEqual(expected);
});
