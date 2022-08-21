export interface GenericRepositoryPort<TEntity> {
    // todo: you may need to change the return type to 'void'
    create(entity: TEntity): Promise<{ id: string }>;
    count(id: string): Promise<number>;
    findById(id: string): Promise<TEntity>;
}