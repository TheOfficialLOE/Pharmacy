export interface GenericRepositoryPort<TEntity> {
    create(entity: TEntity): Promise<{ id: string }>;
    findAll(): Promise<TEntity[]>;
}