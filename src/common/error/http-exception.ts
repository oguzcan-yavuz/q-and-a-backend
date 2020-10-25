export class HttpException extends Error {
  constructor(public readonly statusCode: number, public readonly message: string) {
    super();
  }
}
