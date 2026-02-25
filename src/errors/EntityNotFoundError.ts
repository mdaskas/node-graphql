import CustomError from './CustomError'
import type { ErrorCode } from './types'

class EntityNotFoundError extends CustomError<ErrorCode> {}
export default EntityNotFoundError
