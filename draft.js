const board1 = [
    ['x', 'o', 'x'],
    ['x', 'x', 'o'],
    ['x', 'o', 'o']
]

const board2 = [
    ['o', 'x', 'o'],
    ['o', 'o', 'x'],
    ['o', 'x', 'x']
]

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

console.log(moves(board1, board2))

const colorRange = ['red', 'blue', 'green', 'yellow', 'magenta']
            
const color = colorRange[Math.floor(Math.random() * 5)]

console.log(color)
console.log(Math.floor(Math.random() * 5))