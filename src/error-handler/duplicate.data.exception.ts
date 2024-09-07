import { HttpException, HttpStatus } from "@nestjs/common";


export class DuplicateDataException extends HttpException {

    constructor(message: string) {
        super(message, HttpStatus.CONFLICT);
    }
}