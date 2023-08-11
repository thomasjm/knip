export declare const isFile: (filePath: string) => boolean;
export declare const findFile: (workingDir: string, fileName: string) => string | undefined;
export declare const loadFile: (filePath: string) => Promise<string>;
export declare const loadJSON: (filePath: string) => Promise<any>;
export declare const loadYAML: (filePath: string) => Promise<unknown>;
export declare const parseJSON: (filePath: string, contents: string) => Promise<any>;
export declare const parseYAML: (contents: string) => Promise<unknown>;
