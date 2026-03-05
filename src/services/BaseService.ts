import logger from '../utils/logger'
import type { IBaseService } from '@servicetypes/IBaseService'

export class BaseService implements IBaseService {
    public readonly childLogger: typeof logger

    constructor() {
        this.childLogger = logger.child({ logMetadata: this.constructor.name })
    }
}
