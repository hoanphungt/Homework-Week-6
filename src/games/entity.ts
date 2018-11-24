import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

type Color = string | 'red' | 'blue' | 'green' | 'yellow' | 'magenta'

// interface IColor {
//     param: Color
// }
// const color = colorRange[Math.floor(Math.random() * 5)]

// type Row = [ string, string, string ]

@Entity()
export default class Game extends BaseEntity {

@PrimaryGeneratedColumn()
id?: number

@Column('text', {nullable:false})
name: string

@Column('text') 
color: Color

@Column('json', {nullable:true})
board: JSON

}