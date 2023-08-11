export declare const resolvePluginName: (pluginName: string) => string;
export declare const resolvePresetName: (pluginName: string) => string;
export declare const api: {
    assertVersion: () => boolean;
    cache: {
        (): undefined;
        forever(): any;
        never(): any;
        using(): any;
        invalidate(): any;
    };
    caller: () => boolean;
    env: () => boolean;
    version: string;
};
