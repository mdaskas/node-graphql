import { prisma } from '../lib/prisma'
import logger from '../utils/logger'
import type { IBaseRepository } from '@repotypes/IBaseRepository'

export class BaseRepository implements IBaseRepository {
    protected defaultLimit = 10
    protected defaultOffset = 0
    protected client: typeof prisma
    protected readonly childLogger: typeof logger

    constructor() {
        this.client = prisma
        this.childLogger = logger.child({ logMetadata: this.constructor.name })
    }

    getClient() {
        return this.client
    }
}

export type Constructor<T = {}> = new (...args: any[]) => T
