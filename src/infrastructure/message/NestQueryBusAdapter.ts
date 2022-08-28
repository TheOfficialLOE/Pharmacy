import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { QueryBusPort } from "#libs/message/QueryBusPort";

@Injectable()
export class NestQueryBusAdapter implements QueryBusPort {
    constructor(
        readonly queryBus: QueryBus
    ) {}

    public async sendQuery<TQuery, TQueryResult>(query: TQuery): Promise<TQueryResult> {
        return this.queryBus.execute(query);
    }
}
