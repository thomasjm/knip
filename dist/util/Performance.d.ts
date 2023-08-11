/// <reference types="node" resolution-mode="require"/>
import { PerformanceObserver, PerformanceEntry } from 'node:perf_hooks';
import type { TimerifyOptions } from 'node:perf_hooks';
type Timerify = <T extends (...params: any[]) => any>(fn: T, options?: TimerifyOptions) => T;
export declare const timerify: Timerify;
export declare class Performance {
    isEnabled: boolean;
    startTime: number;
    endTime: number;
    entries: PerformanceEntry[];
    instanceId?: number;
    observer?: PerformanceObserver;
    constructor(isEnabled: boolean);
    private setMark;
    private clearMark;
    private flush;
    private getEntriesByName;
    getTable(): string;
    getTotalTime(): number;
    finalize(): Promise<void>;
    reset(): void;
}
export {};
