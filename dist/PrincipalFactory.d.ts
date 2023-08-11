import ts from 'typescript';
import { ProjectPrincipal } from './ProjectPrincipal.js';
import type { SyncCompilers, AsyncCompilers } from './types/compilers.js';
type Paths = ts.CompilerOptions['paths'];
type Principal = {
    principal: ProjectPrincipal;
    cwds: Set<string>;
    pathKeys: Set<string>;
};
type Principals = Set<Principal>;
type Options = {
    cwd: string;
    compilerOptions: ts.CompilerOptions;
    paths: Paths;
    compilers: [SyncCompilers, AsyncCompilers];
};
export declare class PrincipalFactory {
    principals: Principals;
    getPrincipal(options: Options): ProjectPrincipal;
    private findReusablePrincipal;
    private linkPrincipal;
    private addNewPrincipal;
    getPrincipals(): ProjectPrincipal[];
}
export {};
