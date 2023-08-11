declare const _default: {
    symbols: ({ report, issues, configurationHints, noConfigHints, isShowProgress }: import("../index.js").ReporterOptions) => void;
    compact: ({ report, issues, isShowProgress }: import("../index.js").ReporterOptions) => void;
    codeowners: ({ report, issues, isShowProgress, options }: import("../index.js").ReporterOptions) => void;
    json: ({ report, issues, options }: import("../index.js").ReporterOptions) => Promise<void>;
};
export default _default;
