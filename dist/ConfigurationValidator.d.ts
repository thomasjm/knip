import { z } from 'zod';
export declare const ConfigurationValidator: z.ZodObject<{
    exclude: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    rules: z.ZodOptional<z.ZodRecord<z.ZodUnion<[z.ZodLiteral<"files">, z.ZodLiteral<"dependencies">, z.ZodLiteral<"devDependencies">, z.ZodLiteral<"unlisted">, z.ZodLiteral<"binaries">, z.ZodLiteral<"unresolved">, z.ZodLiteral<"exports">, z.ZodLiteral<"types">, z.ZodLiteral<"nsExports">, z.ZodLiteral<"nsTypes">, z.ZodLiteral<"duplicates">, z.ZodLiteral<"enumMembers">, z.ZodLiteral<"classMembers">]>, z.ZodEnum<["error", "warn", "off"]>>>;
    entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paths: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>>;
    ignore: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    ignoreBinaries: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    ignoreExportsUsedInFile: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodRecord<z.ZodUnion<[z.ZodLiteral<"class">, z.ZodLiteral<"enum">, z.ZodLiteral<"function">, z.ZodLiteral<"interface">, z.ZodLiteral<"member">, z.ZodLiteral<"type">]>, z.ZodBoolean>]>>;
    ignoreDependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    ignoreWorkspaces: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    compilers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodFunction<z.ZodTuple<[z.ZodString], z.ZodUnknown>, z.ZodString>, z.ZodFunction<z.ZodTuple<[z.ZodString], z.ZodUnknown>, z.ZodPromise<z.ZodString>>]>>>;
    syncCompilers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodFunction<z.ZodTuple<[z.ZodString], z.ZodUnknown>, z.ZodString>>>;
    asyncCompilers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodFunction<z.ZodTuple<[z.ZodString], z.ZodUnknown>, z.ZodPromise<z.ZodString>>>>;
    include: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    workspaces: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        paths: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>>;
        ignore: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        ignoreBinaries: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        ignoreDependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        ava: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        babel: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        capacitor: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        changesets: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        commitizen: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        commitlint: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        cspell: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        cypress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        eslint: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        gatsby: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        'github-actions': z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        husky: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        jest: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        lefthook: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        'lint-staged': z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        markdownlint: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        mocha: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        next: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        'npm-package-json-lint': z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        nx: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        nyc: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        playwright: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        postcss: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        prettier: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        'release-it': z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        remark: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        remix: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        rollup: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        'semantic-release': z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        sentry: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        storybook: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        stryker: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        stylelint: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        tailwind: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        typedoc: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        typescript: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        vite: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        vitest: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
        webpack: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
            config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }, {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
        paths?: Record<string, string[]> | undefined;
        ignore?: string | string[] | undefined;
        ignoreBinaries?: string[] | undefined;
        ignoreDependencies?: string[] | undefined;
        ava?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        babel?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        capacitor?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        changesets?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        commitizen?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        commitlint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        cspell?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        cypress?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        eslint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        gatsby?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'github-actions'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        husky?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        jest?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        lefthook?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'lint-staged'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        markdownlint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        mocha?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        next?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'npm-package-json-lint'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        nx?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        nyc?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        playwright?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        postcss?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        prettier?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'release-it'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        remark?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        remix?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        rollup?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'semantic-release'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        sentry?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        storybook?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        stryker?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        stylelint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        tailwind?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        typedoc?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        typescript?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        vite?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        vitest?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        webpack?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
    }, {
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
        paths?: Record<string, string[]> | undefined;
        ignore?: string | string[] | undefined;
        ignoreBinaries?: string[] | undefined;
        ignoreDependencies?: string[] | undefined;
        ava?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        babel?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        capacitor?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        changesets?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        commitizen?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        commitlint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        cspell?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        cypress?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        eslint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        gatsby?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'github-actions'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        husky?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        jest?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        lefthook?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'lint-staged'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        markdownlint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        mocha?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        next?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'npm-package-json-lint'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        nx?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        nyc?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        playwright?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        postcss?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        prettier?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'release-it'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        remark?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        remix?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        rollup?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'semantic-release'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        sentry?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        storybook?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        stryker?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        stylelint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        tailwind?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        typedoc?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        typescript?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        vite?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        vitest?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        webpack?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
    }>>>;
    ava: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    babel: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    capacitor: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    changesets: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    commitizen: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    commitlint: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    cspell: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    cypress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    eslint: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    gatsby: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    'github-actions': z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    husky: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    jest: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    lefthook: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    'lint-staged': z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    markdownlint: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    mocha: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    next: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    'npm-package-json-lint': z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    nx: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    nyc: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    playwright: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    postcss: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    prettier: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    'release-it': z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    remark: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    remix: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    rollup: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    'semantic-release': z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    sentry: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    storybook: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    stryker: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    stylelint: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    tailwind: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    typedoc: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    typescript: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    vite: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    vitest: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
    webpack: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<false>, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, z.ZodObject<{
        config: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        entry: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        project: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }, {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    exclude?: string[] | undefined;
    rules?: Partial<Record<"files" | "dependencies" | "devDependencies" | "unlisted" | "binaries" | "unresolved" | "exports" | "types" | "nsExports" | "nsTypes" | "duplicates" | "enumMembers" | "classMembers", "error" | "warn" | "off">> | undefined;
    entry?: string | string[] | undefined;
    project?: string | string[] | undefined;
    paths?: Record<string, string[]> | undefined;
    ignore?: string | string[] | undefined;
    ignoreBinaries?: string[] | undefined;
    ignoreExportsUsedInFile?: boolean | Partial<Record<"function" | "type" | "enum" | "class" | "interface" | "member", boolean>> | undefined;
    ignoreDependencies?: string[] | undefined;
    ignoreWorkspaces?: string[] | undefined;
    compilers?: Record<string, ((args_0: string, ...args_1: unknown[]) => string) | ((args_0: string, ...args_1: unknown[]) => Promise<string>)> | undefined;
    syncCompilers?: Record<string, (args_0: string, ...args_1: unknown[]) => string> | undefined;
    asyncCompilers?: Record<string, (args_0: string, ...args_1: unknown[]) => Promise<string>> | undefined;
    include?: string[] | undefined;
    workspaces?: Record<string, {
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
        paths?: Record<string, string[]> | undefined;
        ignore?: string | string[] | undefined;
        ignoreBinaries?: string[] | undefined;
        ignoreDependencies?: string[] | undefined;
        ava?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        babel?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        capacitor?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        changesets?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        commitizen?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        commitlint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        cspell?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        cypress?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        eslint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        gatsby?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'github-actions'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        husky?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        jest?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        lefthook?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'lint-staged'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        markdownlint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        mocha?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        next?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'npm-package-json-lint'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        nx?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        nyc?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        playwright?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        postcss?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        prettier?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'release-it'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        remark?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        remix?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        rollup?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'semantic-release'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        sentry?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        storybook?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        stryker?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        stylelint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        tailwind?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        typedoc?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        typescript?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        vite?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        vitest?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        webpack?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
    }> | undefined;
    ava?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    babel?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    capacitor?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    changesets?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    commitizen?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    commitlint?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    cspell?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    cypress?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    eslint?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    gatsby?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'github-actions'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    husky?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    jest?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    lefthook?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'lint-staged'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    markdownlint?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    mocha?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    next?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'npm-package-json-lint'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    nx?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    nyc?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    playwright?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    postcss?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    prettier?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'release-it'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    remark?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    remix?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    rollup?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'semantic-release'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    sentry?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    storybook?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    stryker?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    stylelint?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    tailwind?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    typedoc?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    typescript?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    vite?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    vitest?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    webpack?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
}, {
    exclude?: string[] | undefined;
    rules?: Partial<Record<"files" | "dependencies" | "devDependencies" | "unlisted" | "binaries" | "unresolved" | "exports" | "types" | "nsExports" | "nsTypes" | "duplicates" | "enumMembers" | "classMembers", "error" | "warn" | "off">> | undefined;
    entry?: string | string[] | undefined;
    project?: string | string[] | undefined;
    paths?: Record<string, string[]> | undefined;
    ignore?: string | string[] | undefined;
    ignoreBinaries?: string[] | undefined;
    ignoreExportsUsedInFile?: boolean | Partial<Record<"function" | "type" | "enum" | "class" | "interface" | "member", boolean>> | undefined;
    ignoreDependencies?: string[] | undefined;
    ignoreWorkspaces?: string[] | undefined;
    compilers?: Record<string, ((args_0: string, ...args_1: unknown[]) => string) | ((args_0: string, ...args_1: unknown[]) => Promise<string>)> | undefined;
    syncCompilers?: Record<string, (args_0: string, ...args_1: unknown[]) => string> | undefined;
    asyncCompilers?: Record<string, (args_0: string, ...args_1: unknown[]) => Promise<string>> | undefined;
    include?: string[] | undefined;
    workspaces?: Record<string, {
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
        paths?: Record<string, string[]> | undefined;
        ignore?: string | string[] | undefined;
        ignoreBinaries?: string[] | undefined;
        ignoreDependencies?: string[] | undefined;
        ava?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        babel?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        capacitor?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        changesets?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        commitizen?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        commitlint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        cspell?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        cypress?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        eslint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        gatsby?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'github-actions'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        husky?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        jest?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        lefthook?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'lint-staged'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        markdownlint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        mocha?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        next?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'npm-package-json-lint'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        nx?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        nyc?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        playwright?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        postcss?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        prettier?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'release-it'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        remark?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        remix?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        rollup?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'semantic-release'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        sentry?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        storybook?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        stryker?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        stylelint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        tailwind?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        typedoc?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        typescript?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        vite?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        vitest?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        webpack?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
    }> | undefined;
    ava?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    babel?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    capacitor?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    changesets?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    commitizen?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    commitlint?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    cspell?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    cypress?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    eslint?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    gatsby?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'github-actions'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    husky?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    jest?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    lefthook?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'lint-staged'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    markdownlint?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    mocha?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    next?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'npm-package-json-lint'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    nx?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    nyc?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    playwright?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    postcss?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    prettier?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'release-it'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    remark?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    remix?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    rollup?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'semantic-release'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    sentry?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    storybook?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    stryker?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    stylelint?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    tailwind?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    typedoc?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    typescript?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    vite?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    vitest?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    webpack?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
}>;
