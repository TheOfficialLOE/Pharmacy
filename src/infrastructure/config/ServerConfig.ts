import { get } from "env-var";

export class ServerConfig {
    public static readonly HOST: string = get('API_HOST')
        .required()
        .asString();

    public static readonly PORT: number = get('API_PORT')
        .required()
        .asPortNumber();

    public static readonly ACCESS_TOKEN_SECRET: string = get('API_ACCESS_TOKEN_SECRET')
        .required()
        .asString();

    public static readonly ACCESS_TOKEN_EXPIRATION_IN_HOURS: string = get('API_ACCESS_TOKEN_EXPIRATION_IN_HOURS')
        .required()
        .asString();

    public static readonly EVENTSTOREDB_CLIENT: string = get("EVENTSTOREDB_CLIENT")
        .required()
        .asString();
}