import ts from 'typescript';
export declare function createCustomModuleResolver(customSys: typeof ts.sys, compilerOptions: ts.CompilerOptions, virtualFileExtensions: string[]): (moduleNames: string[], containingFile: string) => Array<ts.ResolvedModule | undefined>;
