declare module 'gpt-3-encoder' {
    function encode(text: string): number[];
    function decode(tokens: number[]): string;
}