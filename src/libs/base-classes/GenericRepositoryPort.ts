export interface GenericRepositoryPort<TEntity> {
    // todo: you may need to change the return type to 'void'
    create(entity: TEntity): Promise<{ id: string }>;
    findById(id: string): Promise<TEntity>;
}