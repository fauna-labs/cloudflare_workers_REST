import type { QueryValue, QueryRequest, QueryOptions } from "./wire-protocol";
/**
 * Creates a new Query. Accepts template literal inputs.
 * @param queryFragments - a {@link TemplateStringsArray} that constitute
 *   the strings that are the basis of the query.
 * @param queryArgs - an Array\<QueryValue | Query\> that
 *   constitute the arguments to inject between the queryFragments.
 * @throws Error - if you call this method directly (not using template
 *   literals) and pass invalid construction parameters
 * @example
 * ```typescript
 *  const str = "baz";
 *  const num = 17;
 *  const innerQuery = fql`${num} + 3)`;
 *  const queryRequestBuilder = fql`${str}.length == ${innerQuery}`;
 * ```
 */
export declare function fql(queryFragments: ReadonlyArray<string>, ...queryArgs: (QueryValue | Query)[]): Query;
/**
 * Internal class.
 * A builder for composing queries using the {@link fql} tagged template
 * function
 */
export declare class Query {
    #private;
    constructor(queryFragments: ReadonlyArray<string>, ...queryArgs: (QueryValue | Query)[]);
    /**
     * Converts this Query to a {@link QueryRequest} you can send
     * to Fauna.
     * @param requestHeaders - optional {@link QueryOptions} to include
     *   in the request (and thus override the defaults in your {@link ClientConfiguration}.
     *   If not passed in, no headers will be set as overrides.
     * @returns a {@link QueryRequest}.
     * @example
     * ```typescript
     *  const num = 8;
     *  const queryBuilder = fql`'foo'.length == ${num}`;
     *  const queryRequest = queryBuilder.toQuery();
     *  // produces:
     *  { query: { fql: ["'foo'.length == ", { value: { "@int": "8" } }, ""] }}
     * ```
     */
    toQuery(requestHeaders?: QueryOptions): QueryRequest;
}
