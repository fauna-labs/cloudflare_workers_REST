import { Client } from "../client";
import { Query } from "../query-builder";
import { QueryOptions, QueryValue } from "../wire-protocol";
/**
 * A materialized view of a Set.
 * @see {@link https://fqlx-beta--fauna-docs.netlify.app/fqlx/beta/reference/language/types#set}
 */
export declare class Page<T extends QueryValue> {
    /** A materialized page of data */
    readonly data: T[];
    /**
     * A pagination cursor, used to obtain additional information in the Set.
     * If `after` is not provided, then `data` must be present and represents the
     * last Page in the Set.
     */
    readonly after?: string;
    constructor({ data, after }: {
        data: T[];
        after?: string;
    });
}
/**
 * A un-materialized Set. Typically received when a materialized Set contains
 * another set, the EmbeddedSet does not contain any data to avoid potential
 * issues such as self-reference and infinite recursion
 * @see {@link https://fqlx-beta--fauna-docs.netlify.app/fqlx/beta/reference/language/types#set}
 */
export declare class EmbeddedSet {
    /**
     * A pagination cursor, used to obtain additional information in the Set.
     */
    readonly after: string;
    constructor(after: string);
}
/**
 * A class to provide an iterable API for fetching multiple pages of data, given
 * a Fauna Set
 */
export declare class SetIterator<T extends QueryValue> implements AsyncGenerator<T[], void, unknown> {
    #private;
    /**
     * Constructs a new {@link SetIterator}.
     *
     * @remarks Though you can use {@link SetIterator} class directly, it is
     * most common to create an instance through the {@link Client.paginate} `paginate`
     * method.
     *
     * @typeParam T - The expected type of the items returned from Fauna on each
     * iteration
     * @param client - The {@link Client} that will be used to fetch new data on
     * each iteration
     * @param initial - An existing fauna Set ({@link Page} or
     * {@link EmbeddedSet}) or function which returns a promise. If the Promise
     * resolves to a {@link Page} or {@link EmbeddedSet} then the iterator will
     * use the client to fetch additional pages of data.
     * @param options - a {@link QueryOptions} to apply to the queries. Optional.
     */
    constructor(client: Client, initial: Page<T> | EmbeddedSet | (() => Promise<T | Page<T> | EmbeddedSet>), options?: QueryOptions);
    /**
     * Constructs a new {@link SetIterator} from an {@link Query}
     *
     * @internal Though you can use {@link SetIterator.fromQuery} directly, it is
     * intended as a convenience for use in the {@link Client.paginate} method
     */
    static fromQuery<T extends QueryValue>(client: Client, query: Query, options?: QueryOptions): SetIterator<T>;
    /**
     * Constructs a new {@link SetIterator} from an {@link Page} or
     * {@link EmbeddedSet}
     *
     * @internal Though you can use {@link SetIterator.fromPageable} directly, it
     * is intended as a convenience for use in the {@link Client.paginate} method
     */
    static fromPageable<T extends QueryValue>(client: Client, pageable: Page<T> | EmbeddedSet, options?: QueryOptions): SetIterator<T>;
    /**
     * Constructs a new {@link FlattenedSetIterator} from the current instance
     *
     * @returns A new {@link FlattenedSetIterator} from the current instance
     */
    flatten(): FlattenedSetIterator<T>;
    /** Implement {@link AsyncGenerator.next} */
    next(): Promise<IteratorResult<T[], void>>;
    /** Implement {@link AsyncGenerator.return} */
    return(): Promise<IteratorResult<T[], void>>;
    /** Implement {@link AsyncGenerator.throw} */
    throw(e: any): Promise<IteratorResult<T[], void>>;
    /** Implement {@link AsyncGenerator} */
    [Symbol.asyncIterator](): this;
}
/**
 * A class to provide an iterable API for fetching multiple pages of data, given
 * a Fauna Set. This class takes a {@link SetIterator} and flattens the results
 * to yield the items directly.
 */
export declare class FlattenedSetIterator<T extends QueryValue> implements AsyncGenerator<T, void, unknown> {
    #private;
    /**
     * Constructs a new {@link FlattenedSetIterator}.
     *
     * @remarks Though you can use {@link FlattenedSetIterator} class directly, it
     * is most common to create an instance through the
     * {@link SetIterator.flatten} method.
     *
     * @typeParam T - The expected type of the items returned from Fauna on each
     * iteration
     * @param setIterator - The {@link SetIterator}
     */
    constructor(setIterator: SetIterator<T>);
    /** Implement {@link AsyncGenerator.next} */
    next(): Promise<IteratorResult<T, void>>;
    /** Implement {@link AsyncGenerator.return} */
    return(): Promise<IteratorResult<T, void>>;
    /** Implement {@link AsyncGenerator.throw} */
    throw(e: any): Promise<IteratorResult<T, void>>;
    /** Implement {@link AsyncGenerator} */
    [Symbol.asyncIterator](): this;
}
