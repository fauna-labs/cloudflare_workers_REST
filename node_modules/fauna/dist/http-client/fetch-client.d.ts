/** following reference needed to include types for experimental fetch API in Node */
/// <reference lib="dom" />
import { HTTPClient, HTTPClientOptions, HTTPRequest, HTTPResponse } from "./http-client";
/**
 * An implementation for {@link HTTPClient} that uses the native fetch API
 */
export declare class FetchClient implements HTTPClient {
    #private;
    constructor({ url, fetch_keepalive }: HTTPClientOptions);
    /** {@inheritDoc HTTPClient.request} */
    request({ data, headers: requestHeaders, method, client_timeout_ms, }: HTTPRequest): Promise<HTTPResponse>;
    /** {@inheritDoc HTTPClient.close} */
    close(): void;
}
