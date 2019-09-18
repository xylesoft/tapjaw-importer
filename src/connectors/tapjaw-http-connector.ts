import { IncomingMessage, request } from 'http';
import * as https from 'https';
import { encode, decode, encodingExists } from 'iconv-lite';
import * as querystring from 'querystring';
import * as zlib from 'zlib';
import TapjawConnector, { TapjawConnectorResponse, TapjawConnectorError } from '../contracts/tapjaw-connector';
import TapjawAuthenticator from '../contracts/tapjaw-authenticator';

export interface TapjawHttpHeaders {
    [key: string]: string | undefined;

    Accept?: string;
    'Accept-Encoding'?: string;
    Cookie?: string;
    'User-Agent'?: string;
}

export interface TapjawHttpQueryParameters {
    [key: string]: string;
}

export interface TapjawHttpFormParameters {
    [key: string]: string;
}

export type TapjawHttpRequestBody = string | TapjawHttpFormParameters;

export default abstract class TapjawHttpConnector implements TapjawConnector {
    abstract enableGzip: boolean;
    abstract useDecoding?: string;
    abstract useEncoding?: string;
    protected authenticatorData: any;

    public constructor(
        protected readonly host: string,
        protected readonly port = 80,
        protected readonly enableHttps = true,
        protected readonly security?: TapjawAuthenticator
    ) {}

    /**
     * Set the character set encoding to decode the API response data before encoding or returning.
     *
     * @param encoding  string|null
     */
    public setDecoding(encoding: string | null): void {
        if (!encoding) {
            delete this.useDecoding;
        }

        if (encodingExists(encoding as string)) {
            throw new TapjawConnectorError(`Unsupported decoding: ${encoding}`);
        }

        this.useDecoding = encoding as string;
    }

    /**
     * Set the character set encoding on the response data.
     *
     * @param encoding string|null
     */
    public setEncoding(encoding: string | null): void {
        if (!encoding) {
            delete this.useEncoding;
        }

        if (!encodingExists(encoding as string)) {
            throw new TapjawConnectorError(`Unsupported encoding: ${encoding}`);
        }

        this.useEncoding = encoding as string;
    }

    /**
     * Set the authenticator response to connector.
     *
     * @param authenticatorData any
     *
     * @return void
     */
    public setAuthenticatorData(authenticatorData: any): void {
        this.authenticatorData = authenticatorData;
    }

    /**
     * Send a GET request to the API.
     *
     * @param uri       string
     * @param query     TapjawHttpQueryParameters
     * @param headers   TapjawHttpHeaders (optional)
     *
     * @return TapjawConnectorResponse
     */
    public async get(uri: string, query: TapjawHttpQueryParameters, headers?: TapjawHttpHeaders): Promise<TapjawConnectorResponse> {
        const options: https.RequestOptions = {
            hostname: this.host,
            port: this.port,
            path: `${uri}?${querystring.stringify(query)}`,
            method: 'GET',
            headers
        };

        return this.getResponse(options);
    }

    /**
     * Send a POST request to the API.
     *
     * @param uri       string
     * @param query     TapjawHttpQueryParameters
     * @param body      TapjawHttpRequestBody
     * @param headers   TapjawHttpHeaders (optional)
     *
     * @return TapjawConnectorResponse
     */
    public async post(uri: string, query: TapjawHttpQueryParameters, body: TapjawHttpRequestBody, headers?: TapjawHttpHeaders): Promise<TapjawConnectorResponse> {
        if (typeof body === 'object') {
            body = querystring.stringify(body);
        }

        const options: https.RequestOptions = {
            hostname: this.host,
            port: this.port,
            path: `${uri}?${querystring.stringify(query)}`,
            method: 'POST',
            ...{
                ...headers,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        return this.getResponse(options, body);
    }

    /**
     * Send a POST request to the API.
     *
     * @param uri       string
     * @param query     TapjawHttpQueryParameters
     * @param json      TapjawHttpRequestBody
     * @param headers   TapjawHttpHeaders (optional)
     *
     * @return TapjawConnectorResponse
     */
    public async postJson(uri: string, query: TapjawHttpQueryParameters, json: TapjawHttpRequestBody, headers?: TapjawHttpHeaders): Promise<TapjawConnectorResponse> {
        if (typeof json !== 'string') {
            json = JSON.stringify(json);
        }

        const options: https.RequestOptions = {
            hostname: this.host,
            port: this.port,
            path: `${uri}?${querystring.stringify(query)}`,
            method: 'POST',
            ...{
                ...headers,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(json)
            }
        };

        return this.getResponse(options);
    }

    /**
     * Has a security authenticator been configured?
     *
     * @return boolean
     */
    protected securityEnabled(): boolean {
        return Boolean(this.security);
    }

    /**
     * Has the security authenticator successfully authenticated.
     *
     * @return boolean
     */
    protected isAuthenticated(): boolean {
        return Boolean(this.security && this.security.isAuthenticated());
    }

    /**
     * http/https request handler
     *
     * @param options https.RequestOptions
     * @param writeBody string|undefined
     */
    private getResponse(options: https.RequestOptions, writeBody?: string): Promise<TapjawConnectorResponse> {
        return new Promise((resolve, reject) => {
            const requestImpl = this.enableHttps ? https.request : request;
            const connectorRequest = requestImpl(
                options,
                (response: IncomingMessage) => {
                    if (response.statusCode !== 200) {
                        const error = new TapjawConnectorError(`HTTP Status code was ${response.statusCode}.`);
                        reject(error);
                    }

                    let buffer: Buffer[] = [];
                    response.on('data', (data: string) => buffer.push(Buffer.from(data, 'binary')));
                    response.on('end', async () => {
                        let contentBuffer = Buffer.concat(buffer);

                        if (!contentBuffer) {
                            reject(new TapjawConnectorError('Empty content buffer'));
                        }

                        if (this.enableGzip) {
                            contentBuffer = zlib.gunzipSync(contentBuffer);
                        }

                        if (this.useDecoding) {
                            contentBuffer = Buffer.from(decode(contentBuffer, this.useDecoding));
                        }

                        // return raw string buffer.
                        resolve(
                            this.useEncoding
                                ? encode(contentBuffer.toString(), this.useEncoding).toString()
                                : contentBuffer.toString()
                        );
                    });
                    response.on('error', reject);
                }
            );

            if (writeBody) {
                connectorRequest.write(writeBody);
            }

            connectorRequest.end();
        });
    }
}
