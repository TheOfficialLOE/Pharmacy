export interface GenericRepositoryPort<TEntity> {
    create(entity: TEntity): Promise<{ id: string }>;
    find(id: string): Promise<TEntity>;
}