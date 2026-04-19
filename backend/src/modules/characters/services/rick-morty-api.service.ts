import axios, { type AxiosInstance } from 'axios';
import type { Logger } from 'pino';

import { env } from '../../../config/env';
import { MeasureTime } from '../../../decorators/measure-time.decorator';
import type { RickMortyApiCharacter } from '../mappers/character.mapper';

interface ApiPageResponse<T> {
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: T[];
}

export class RickMortyApiService {
  private readonly http: AxiosInstance;

  constructor(private readonly logger: Logger) {
    this.http = axios.create({
      baseURL: env.RICK_MORTY_API_URL,
      timeout: 15000,
      headers: { 'User-Agent': 'rick-morty-backend/1.0' },
    });

    this.http.interceptors.response.use(
      (r) => r,
      (err) => {
        this.logger.warn(
          { url: err?.config?.url, status: err?.response?.status },
          'Rick and Morty API request failed'
        );
        throw err;
      }
    );
  }

  @MeasureTime('RickMortyApiService.fetchFirstN')
  async fetchFirstN(n: number): Promise<RickMortyApiCharacter[]> {
    // Traverse paginated upstream API until collecting requested amount.
    const items: RickMortyApiCharacter[] = [];
    let page = 1;
    while (items.length < n) {
      const { data } = await this.http.get<ApiPageResponse<RickMortyApiCharacter>>(
        `/character?page=${page}`
      );
      items.push(...data.results);
      if (!data.info.next) break;
      page += 1;
    }
    return items.slice(0, n);
  }

  @MeasureTime('RickMortyApiService.fetchAll')
  async fetchAll(): Promise<RickMortyApiCharacter[]> {
    // Full sync used by cron to refresh local catalog.
    const items: RickMortyApiCharacter[] = [];
    let page = 1;
    while (true) {
      const { data } = await this.http.get<ApiPageResponse<RickMortyApiCharacter>>(
        `/character?page=${page}`
      );
      items.push(...data.results);
      if (!data.info.next) break;
      page += 1;
    }
    return items;
  }
}
