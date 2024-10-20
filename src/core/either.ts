// UI -> CONTROLLER -> CASO DE USO -> ENTIDADE -> CASO DE USO -> REPOSITORIO -> DB
// Error
export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isRight(): this is Right<R, L> {
    return false
  }

  isLeft(): this is Left<R, L> {
    return true
  }
}

// Success
export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight(): this is Right<R, L> {
    return true
  }

  isLeft(): this is Left<R, L> {
    return false
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
