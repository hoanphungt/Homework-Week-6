import { JsonController, Get, Post, HttpCode, Body, Put, Param, NotFoundError } from 'routing-controllers'
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
        @Body() game: Partial<Game>
    ) {
        
        const colorRange = ['red', 'blue', 'green', 'yellow', 'magenta']
        const color = colorRange[Math.floor(Math.random() * 5)]
        const name = game.name

        return Game.create({
            name,
            color
        }).save()
    }

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Game not found!')

        return Game.merge(game, update).save()
    }

}