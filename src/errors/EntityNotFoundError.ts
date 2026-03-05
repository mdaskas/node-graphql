import CustomError from './CustomError'
import type { ErrorCode } from './types'

class EntityNotFoundError extends CustomError<ErrorCode> {}
export default EntityNotFoundError

type HttpCode = 200 | 400 | 401 | 403 | 404 | 500
class AppError extends Error {
    public override readonly name: string
    public readonly httpCode: HttpCode
    public readonly isOperational: boolean

    constructor(
        name: string,
        httpCode: HttpCode,
        description: string,
        isOperational: boolean
    ) {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain

        this.name = name
        this.httpCode = httpCode
        this.isOperational = isOperational

        Error.captureStackTrace(this)
    }
}
