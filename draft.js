const board1 = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
]

const board2 = [
    ['o', 'o', 'o'],
    ['o', 'o', 'x'],
    ['o', 'x', 'o']
]

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

console.log(moves(board1, board2))

