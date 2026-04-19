type Token = string | symbol;
type Constructor<T> = new (...args: unknown[]) => T;
type Factory<T> = (resolve: <R>(token: Token) => R) => T;

type Entry<T> =
  | { kind: 'value'; value: T }
  | { kind: 'class'; ctor: Constructor<T>; deps: Token[]; singleton: boolean; instance?: T }
  | { kind: 'factory'; factory: Factory<T>; singleton: boolean; instance?: T };

const registry = new Map<Token, Entry<unknown>>();

export function registerValue<T>(token: Token, value: T): void {
  registry.set(token, { kind: 'value', value });
}

export function registerClass<T>(
  token: Token,
  ctor: Constructor<T>,
  deps: Token[] = [],
  options: { singleton?: boolean } = {}
): void {
  registry.set(token, {
    kind: 'class',
    ctor,
    deps,
    singleton: options.singleton ?? true,
  });
}

export function registerFactory<T>(
  token: Token,
  factory: Factory<T>,
  options: { singleton?: boolean } = {}
): void {
  registry.set(token, {
    kind: 'factory',
    factory,
    singleton: options.singleton ?? true,
  });
}

export function resolve<T>(token: Token): T {
  const entry = registry.get(token) as Entry<T> | undefined;
  if (!entry) {
    throw new Error(`No provider registered for token: ${String(token)}`);
  }
  if (entry.kind === 'value') return entry.value;
  if (entry.kind === 'class') {
    if (entry.singleton && entry.instance) return entry.instance;
    const deps = entry.deps.map((d) => resolve(d));
    const instance = new entry.ctor(...deps);
    if (entry.singleton) entry.instance = instance;
    return instance;
  }
  if (entry.singleton && entry.instance) return entry.instance;
  const instance = entry.factory(resolve);
  if (entry.singleton) entry.instance = instance;
  return instance;
}

export function hasToken(token: Token): boolean {
  return registry.has(token);
}

export function resetContainer(): void {
  registry.clear();
}

export const TOKENS = {
  // Infra
  Sequelize: Symbol('Sequelize'),
  Redis: Symbol('Redis'),
  Logger: Symbol('Logger'),
  CacheService: Symbol('CacheService'),
  // Characters
  CharacterModel: Symbol('CharacterModel'),
  CommentModel: Symbol('CommentModel'),
  FavoriteModel: Symbol('FavoriteModel'),
  CharacterRepository: Symbol('CharacterRepository'),
  CommentRepository: Symbol('CommentRepository'),
  FavoriteRepository: Symbol('FavoriteRepository'),
  CharacterService: Symbol('CharacterService'),
  CommentService: Symbol('CommentService'),
  FavoriteService: Symbol('FavoriteService'),
  RickMortyApiService: Symbol('RickMortyApiService'),
} as const;
