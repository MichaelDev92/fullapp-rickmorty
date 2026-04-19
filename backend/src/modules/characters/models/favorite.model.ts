import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

import { Character } from './character.model';

@Table({
  tableName: 'favorites',
  underscored: true,
  timestamps: true,
  indexes: [{ unique: true, fields: ['character_id', 'session_id'] }],
})
export class Favorite extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Character)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'character_id' })
  declare characterId: number;

  @Unique('character_session_unique')
  @AllowNull(false)
  @Column({ type: DataType.STRING(64), field: 'session_id' })
  declare sessionId: string;

  @BelongsTo(() => Character, 'characterId')
  declare character?: Character;
}
