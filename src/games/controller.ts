import { JsonController, Get, Post, HttpCode, Body, Put, Param, NotFoundError, BadRequestError } from 'routing-controllers'
import Game from './entity';

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length
    
const colorRange = ['red', 'blue', 'green', 'yellow', 'magenta']

@JsonController()
export default class GameController {

    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return { games }
    }

    @Post('/games')
    @HttpCode(201)
    createGame(
        @Body() game: Game
    ) {
        return game.save()
    }

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        const { color, board } = update
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Game not found!')

        if (color) {
            if (!colorRange.includes(color)) throw new BadRequestError('Wrong color')
        }

        if (board) {
            if (moves(game.board, board) > 1) {
                console.log(moves(game.board, board))
                throw new BadRequestError('You can only make one move per one request')
            }            
        }

        return Game.merge(game, update).save()
    }
}