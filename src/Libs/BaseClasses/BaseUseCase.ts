
export interface BaseUseCase<Payload, DTO> {
    execute(payload: Payload): Promise<DTO>;
}