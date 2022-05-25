import { Algorithm } from 'jsonwebtoken';
export default abstract class JWTBuilder {
    protected readonly algorithm: Algorithm;
    constructor(algorithm?: Algorithm);
    getToken(): Promise<string>;
    protected abstract getPayloadMetadata(): Promise<object>;
    protected abstract getSecretKey(): Promise<string>;
}