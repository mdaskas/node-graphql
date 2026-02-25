import { prisma } from '../../lib/prisma'
import type { IBaseRepository } from './IBaseRepository'

export class BaseRepository implements IBaseRepository {
  protected defaultLimit = 10
  protected defaultOffset = 0
  protected client: typeof prisma
  constructor() {
    this.client = prisma
  }

  getClient() {
    return this.client
  }
}

export type Constructor<T = {}> = new (...args: any[]) => T
