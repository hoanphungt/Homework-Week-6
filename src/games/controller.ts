import { JsonController, Get, Post, HttpCode, Body, Put, Param, NotFoundError, BadRequestError } from 'routing-controllers'
import Game from './entity';

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
        const moves = (board1, board2) => {
            return (
                board1
                    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
                    .reduce((a, b) => a.concat(b))
                    .length
            )
        }            
        const colorRange = ['red', 'blue', 'green', 'yellow', 'magenta']
        //check if game exists
        if (!game) throw new NotFoundError('Game not found!')
        //check if updated color is a valid color
        if (color) {
            if (!colorRange.includes(color)) throw new BadRequestError('Wrong color')
        }
        //check if more than 1 move were made per request
        if (board) {
            if (moves(game.board, board) > 1) {
                throw new BadRequestError('You can only make one move per time')
            }
        }
        //if all above conditions met, merge and save the new updates
        return Game.merge(game, update).save()
    }
}