export interface DecodeOptions {
    long_type: "number" | "bigint";
}
/**
 * TaggedType provides the encoding/decoding of the Fauna Tagged Type formatting
 */
export declare class TaggedTypeFormat {
    /**
     * Encode the Object to the Tagged Type format for Fauna
     *
     * @param obj - Object that will be encoded
     * @returns Map of result
     */
    static encode(obj: any): any;
    /**
     * Decode the JSON string result from Fauna to remove Tagged Type formatting.
     *
     * @param input - JSON string result from Fauna
     * @returns object of result of FQL query
     */
    static decode(input: string, decodeOptions: DecodeOptions): any;
}
export declare const LONG_MIN: bigint;
export declare const LONG_MAX: bigint;
export declare const INT_MIN: number;
export declare const INT_MAX: number;
