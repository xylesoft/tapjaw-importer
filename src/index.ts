
import * as querystring from 'querystring';

export { run } from '@oclif/command';

// Contracts
export { default as TapjawAdapter } from './contracts/tapjaw-adapter';
export { default as TapjawConnector } from './contracts/tapjaw-connector';
export { default as TapjawAuthenticator } from './contracts/tapjaw-authenticator';
export { default as TapjawIterator } from './contracts/tapjaw-iterator';
export { default as TapjawMessage } from './contracts/tapjaw-message';
export { default as TapjawCommand } from './contracts/tapjaw-command';

// Connectors
export { default as TapjawHttpConnector } from './connectors/tapjaw-http-connector';
// export { default as TapjawSoapConnector } from './connectors/tapjaw-soap-connector';

// Authenticators
import { default as TapjawBasicAuthenticator } from './authenticators/basic-auth-authenticator';
import { default as TapjawBearerAuthenticator } from './authenticators/bearer-auth-authenticator';
import { default as TapjawOauthAuthenticator } from './authenticators/oauth-authenticator';

// @deprecate in 0.2.0 release.
export {
    TapjawBasicAuthenticator,
    TapjawBearerAuthenticator,
    TapjawOauthAuthenticator
};

import { default as TapjawApplyAuthorizationHttpHeaderWrapper } from './authenticators/wrappers/apply-authorization-http-header-wrapper';
import { default as TapjawApplyOauthAuthorizationHttpHeaderWrapper } from './authenticators/wrappers/apply-oauth-authorization-http-header-wrapper';

// @deprecate in 0.2.0 release.
export {
    TapjawApplyAuthorizationHttpHeaderWrapper,
    TapjawApplyOauthAuthorizationHttpHeaderWrapper
};

const createBasicSecurity = (username: string, password: string) => new TapjawApplyAuthorizationHttpHeaderWrapper(new TapjawBasicAuthenticator(username, password));
const createBearerSecurity = (token: string) => new TapjawApplyAuthorizationHttpHeaderWrapper(new TapjawBearerAuthenticator(token));
const createOAuthSecurity = (
    clientId: string,
    clientSecret: string,
    hostname: string,
    path: string,
    postParams: querystring.ParsedUrlQueryInput,
    method: string = 'POST',
    responseEncoding = 'utf8',
) => new TapjawApplyOauthAuthorizationHttpHeaderWrapper(
        new TapjawOauthAuthenticator(
            clientId,
            clientSecret,
            hostname,
            path,
            postParams,
            method,
            responseEncoding
        )
    );


export {
    createBasicSecurity,
    createBearerSecurity,
    createOAuthSecurity,
}

// Iterators
export { default as StdoutIterator } from './iterators/stdout-iterator';
export { default as OutputIterator } from './iterators/output-iterator';

// Support
export { default as sortObjectArrays } from './support/sort-object-arrays';

// Parsers
export { default as xmlToJson } from './parsers/xml-to-json';
export { default as csvToJson } from './parsers/csv-to-json';