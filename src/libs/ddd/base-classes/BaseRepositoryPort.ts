export interface RepositoryPort<TEntity> {
    create(entity: TEntity): Promise<void>;
    countById(id: string): Promise<number>;
    findById(id: string): Promise<TEntity>;
}