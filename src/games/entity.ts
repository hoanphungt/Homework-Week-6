import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

const colorRange = ['red', 'blue', 'green', 'yellow', 'magenta']

const colorPicker = () => {
    return colorRange[Math.floor(Math.random() * colorRange.length)]
}

type Board = [
    [string, string, string],
    [string, string, string],
    [string, string, string]
]

const defaultBoard: Board = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
]

@Entity()
export default class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', { nullable: false })
    name: string

    @Column('text')
    color: string = colorPicker()

    @Column('json', { default: defaultBoard })
    board: Board

}