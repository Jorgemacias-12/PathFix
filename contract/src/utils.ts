export function assert(statement, message) {
    if (!statement) {
        throw Error(`Assertion failed: ${message}`);
    }
}

export const STORAGE_QUESTION: bigint = BigInt("100000000000000000000000");