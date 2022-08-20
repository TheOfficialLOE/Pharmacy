
export interface Mapper<DomainEntity, OrmEntity> {
    toDomain(ormEntity: OrmEntity): DomainEntity;
    toOrm(domainEntity: DomainEntity): OrmEntity;
}