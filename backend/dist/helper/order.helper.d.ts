export declare class OrderHelper {
    private readonly BASE_62_DIGITS;
    private midpoint;
    private validateInteger;
    private getIntegerLength;
    private getIntegerPart;
    private validateOrderKey;
    private incrementInteger;
    private decrementInteger;
    generateKeyBetween(a: string | null | undefined, b: string | null | undefined, digits?: string): string;
    generateNKeysBetween(a: string | null | undefined, b: string | null | undefined, n: number, digits?: string): string[];
}
