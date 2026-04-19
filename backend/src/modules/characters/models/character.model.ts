import {
  AllowNull,
  Column,
  DataType,
  DeletedAt,
  HasMany,
  Index,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

import { Comment } from './comment.model';
import { Favorite } from './favorite.model';
import { Optional } from 'sequelize';

interface CharacterAttributes {
  id: number;
  externalId: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type?: string | null;
  gender: CharacterGender;
  originName?: string | null;
  originUrl?: string | null;
  locationName?: string | null;
  image?: string | null;
  episodesCount: number;
  created?: Date | null;
  deletedAt?: Date | null;
}

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';
export type CharacterCreationAttributes = Optional<CharacterAttributes, 'id' | 'deletedAt'>;

@Table({
  tableName: 'characters',
  paranoid: true,
  underscored: true,
  timestamps: true,
})
export class Character extends Model<CharacterAttributes, CharacterCreationAttributes> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Unique
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'external_id' })
  declare externalId: number;

  @Index
  @AllowNull(false)
  @Column({ type: DataType.STRING(120) })
  declare name: string;

  @Index
  @AllowNull(false)
  @Column({ type: DataType.ENUM('Alive', 'Dead', 'unknown') })
  declare status: CharacterStatus;

  @Index
  @AllowNull(false)
  @Column({ type: DataType.STRING(80) })
  declare species: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING(80) })
  declare type: string | null;

  @Index
  @AllowNull(false)
  @Column({ type: DataType.ENUM('Female', 'Male', 'Genderless', 'unknown') })
  declare gender: CharacterGender;

  @Index
  @AllowNull(true)
  @Column({ type: DataType.STRING(120), field: 'origin_name' })
  declare originName: string | null;

  @AllowNull(true)
  @Column({ type: DataType.STRING(255), field: 'origin_url' })
  declare originUrl: string | null;

  @AllowNull(true)
  @Column({ type: DataType.STRING(120), field: 'location_name' })
  declare locationName: string | null;

  @AllowNull(true)
  @Column({ type: DataType.STRING(255) })
  declare image: string | null;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER, defaultValue: 0, field: 'episodes_count' })
  declare episodesCount: number;

  @AllowNull(true)
  @Column({ type: DataType.DATE })
  declare created: Date | null;

  @DeletedAt
  @Column({ type: DataType.DATE, field: 'deleted_at' })
  declare deletedAt: Date | null;

  @HasMany(() => Comment, 'characterId')
  declare comments?: Comment[];

  @HasMany(() => Favorite, 'characterId')
  declare favorites?: Favorite[];
}
