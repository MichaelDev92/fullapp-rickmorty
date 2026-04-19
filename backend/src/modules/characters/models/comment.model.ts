import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Character } from './character.model';

@Table({
  tableName: 'comments',
  underscored: true,
  timestamps: true,
})
export class Comment extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Character)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'character_id' })
  declare characterId: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(80) })
  declare author: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare body: string;

  @BelongsTo(() => Character, 'characterId')
  declare character?: Character;
}
