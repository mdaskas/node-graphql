import type { prisma } from '../../lib/prisma'

export interface IBaseRepository {
  getClient(): typeof prisma
}
