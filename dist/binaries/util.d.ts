export declare const tryResolveFilePath: (cwd: string, specifier: string, acceptModuleSpecifier?: boolean) => string | undefined;
export declare const tryResolveSpecifiers: (cwd: string, specifiers: string[]) => (string | undefined)[];
export declare const toBinary: (specifier: string) => string;
export declare const fromBinary: (specifier: string) => string;
export declare const isBinary: (specifier: string) => boolean;
export declare const stripVersionFromSpecifier: (specifier: string) => string;
export declare const stripBinaryPath: (command: string) => string;
export declare const argsFrom: (args: string[], from: string) => string[];
