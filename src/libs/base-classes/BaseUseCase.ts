
export interface UseCase<Payload, DTO> {
    execute(payload: Payload): Promise<DTO>;
}