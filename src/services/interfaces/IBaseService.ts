import type logger from '../../utils/logger'

export interface IBaseService {
    childLogger: typeof logger
}
