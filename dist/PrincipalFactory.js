import ts from 'typescript';
import { ProjectPrincipal } from './ProjectPrincipal.js';
import { toAbsolute } from './util/path.js';
const mergePaths = (cwd, compilerOptions, paths = {}) => {
    const overridePaths = Object.keys(paths).reduce((overridePaths, key) => {
        overridePaths[key] = paths[key].map(entry => toAbsolute(entry, cwd));
        return overridePaths;
    }, {});
    compilerOptions.paths = { ...compilerOptions.paths, ...overridePaths };
    return compilerOptions;
};
export class PrincipalFactory {
    principals = new Set();
    getPrincipal(options) {
        const { cwd, compilerOptions, paths } = options;
        options.compilerOptions = mergePaths(cwd, compilerOptions, paths);
        const principal = this.findReusablePrincipal(compilerOptions);
        if (principal) {
            this.linkPrincipal(principal, cwd, compilerOptions);
            return principal.principal;
        }
        else {
            return this.addNewPrincipal(options);
        }
    }
    findReusablePrincipal(compilerOptions) {
        const workspacePaths = compilerOptions?.paths ? Object.keys(compilerOptions.paths) : [];
        const principal = Array.from(this.principals).find(principal => {
            if (compilerOptions.pathsBasePath && principal.principal.compilerOptions.pathsBasePath)
                return false;
            if (compilerOptions.baseUrl === principal.principal.compilerOptions.baseUrl) {
                return workspacePaths.every(p => !principal.pathKeys.has(p));
            }
            return !compilerOptions.baseUrl;
        });
        return principal;
    }
    linkPrincipal(principal, cwd, compilerOptions) {
        const { pathsBasePath, paths } = compilerOptions;
        if (pathsBasePath)
            principal.principal.compilerOptions.pathsBasePath = pathsBasePath;
        Object.keys(paths ?? {}).forEach(p => principal.pathKeys.add(p));
        principal.principal.compilerOptions.paths = { ...principal.principal.compilerOptions.paths, ...paths };
        principal.cwds.add(cwd);
    }
    addNewPrincipal(options) {
        const { cwd, compilerOptions } = options;
        const pathKeys = new Set(Object.keys(compilerOptions?.paths ?? {}));
        const principal = new ProjectPrincipal(options);
        this.principals.add({ principal, cwds: new Set([cwd]), pathKeys });
        return principal;
    }
    getPrincipals() {
        return Array.from(this.principals).map(p => p.principal);
    }
}
