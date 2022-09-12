

export interface QueryBusPort {
    sendQuery<Query extends object, QueryResult>(query: Query): Promise<QueryResult>;
}