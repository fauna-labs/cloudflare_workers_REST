import { HTTPClient, HTTPClientOptions, HTTPRequest, HTTPResponse } from "./http-client";
/**
 * An implementation for {@link HTTPClient} that uses the node http package
 */
export declare class NodeHTTP2Client implements HTTPClient {
    #private;
    private constructor();
    /**
     * Gets a {@link NodeHTTP2Client} matching the {@link HTTTPClientOptions}
     * @param httpClientOptions - the {@link HTTTPClientOptions}
     * @returns a {@link NodeHTTP2Client} matching the {@link HTTTPClientOptions}
     */
    static getClient(httpClientOptions: HTTPClientOptions): NodeHTTP2Client;
    /** {@inheritDoc HTTPClient.request} */
    request(req: HTTPRequest): Promise<HTTPResponse>;
    /** {@inheritDoc HTTPClient.close} */
    close(): void;
    /**
     * @returns true if this client has been closed, false otherwise.
     */
    isClosed(): boolean;
}
