import { Op, type WhereOptions } from 'sequelize';

import type { CharacterFilterDto, FindCharactersParams } from '../dtos/character-filter.dto';
import type { ICharacterRepository } from '../interfaces/character.repository.interface';
import { Character, CharacterCreationAttributes } from '../models/character.model';

function buildWhere(filter?: CharacterFilterDto): WhereOptions {
  // Build dynamic SQL WHERE clauses from optional GraphQL filters.
  const where: WhereOptions = {};
  if (!filter) return where;

  if (filter.name) {
    Object.assign(where, { name: { [Op.iLike]: `%${filter.name}%` } });
  }
  if (filter.status) {
    Object.assign(where, { status: filter.status });
  }
  if (filter.species) {
    Object.assign(where, { species: { [Op.iLike]: `%${filter.species}%` } });
  }
  if (filter.gender) {
    Object.assign(where, { gender: filter.gender });
  }
  if (filter.origin) {
    Object.assign(where, { originName: { [Op.iLike]: `%${filter.origin}%` } });
  }

  return where;
}

export class CharacterRepository implements ICharacterRepository {
  async findAll(params: FindCharactersParams): Promise<{ rows: Character[]; count: number }> {
    const page = params.pagination?.page ?? 1;
    const pageSize = params.pagination?.pageSize ?? 20;
    const order: Array<[string, 'ASC' | 'DESC']> = params.sortByName
      ? [['name', params.sortByName]]
      : [['id', 'ASC']];

    const result = await Character.findAndCountAll({
      where: buildWhere(params.filter),
      order,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      paranoid: !params.includeDeleted,
    });

    return { rows: result.rows, count: result.count };
  }

  async findById(id: number, includeDeleted = false): Promise<Character | null> {
    return Character.findByPk(id, { paranoid: !includeDeleted });
  }

  async findByExternalId(externalId: number): Promise<Character | null> {
    return Character.findOne({ where: { externalId }, paranoid: false });
  }

  async bulkUpsert(items: Array<CharacterCreationAttributes>): Promise<number> {
    if (items.length === 0) return 0;
    // Upsert by unique key, updating mutable fields from latest API snapshot.
    const result = await Character.bulkCreate(items, {
      updateOnDuplicate: [
        'name',
        'status',
        'species',
        'type',
        'gender',
        'originName',
        'originUrl',
        'locationName',
        'image',
        'episodesCount',
        'created',
      ],
    });
    return result.length;
  }

  async softDelete(id: number): Promise<boolean> {
    const removed = await Character.destroy({ where: { id } });
    return removed > 0;
  }

  async restore(id: number): Promise<Character | null> {
    await Character.restore({ where: { id } });
    return Character.findByPk(id);
  }
}
