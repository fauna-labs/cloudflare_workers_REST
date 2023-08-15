import { FetchClient } from "./fetch-client";
import { NodeHTTP2Client } from "./node-http2-client";
import { HTTPClient, HTTPClientOptions, HTTPRequest, HTTPResponse } from "./http-client";
export declare const getDefaultHTTPClient: (options: HTTPClientOptions) => HTTPClient;
export declare const isHTTPResponse: (res: any) => res is HTTPResponse;
export { FetchClient, NodeHTTP2Client, HTTPClient, HTTPRequest, HTTPResponse };
