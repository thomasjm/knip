type Options = {
    dir: string;
    packageName: string;
    cwd: string;
};
export declare const getPackageManifest: ({ dir, packageName, cwd }: Options) => Promise<any>;
export {};
