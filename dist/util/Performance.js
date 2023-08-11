import { performance, PerformanceObserver, PerformanceEntry } from 'node:perf_hooks';
import EasyTable from 'easy-table';
import Summary from 'summary';
import parsedArgValues from './cli-arguments.js';
const { performance: isEnabled = false } = parsedArgValues;
export const timerify = fn => (isEnabled ? performance.timerify(fn) : fn);
export class Performance {
    isEnabled;
    startTime = 0;
    endTime = 0;
    entries = [];
    instanceId;
    observer;
    constructor(isEnabled) {
        if (isEnabled) {
            this.startTime = performance.now();
            this.instanceId = Math.floor(performance.now() * 100);
            this.observer = new PerformanceObserver(items => {
                items.getEntries().forEach(entry => {
                    this.entries.push(entry);
                });
            });
            this.observer.observe({ entryTypes: ['function'] });
        }
        this.isEnabled = isEnabled;
    }
    setMark(name) {
        const id = `${this.instanceId}:${name}`;
        performance.mark(`${id}:start`);
    }
    clearMark(name) {
        const id = `${this.instanceId}:${name}`;
        performance.mark(`${id}:end`);
        performance.measure(id, `${id}:start`, `${id}:end`);
        performance.clearMarks(`${id}:start`);
        performance.clearMarks(`${id}:end`);
    }
    async flush() {
        this.setMark('_flush');
        await new Promise(resolve => setTimeout(resolve, 1));
        this.clearMark('_flush');
    }
    getEntriesByName() {
        return this.entries.reduce((entries, entry) => {
            const name = entry.name.replace(`${this.instanceId}:`, '');
            entries[name] = entries[name] ?? [];
            entries[name].push(entry.duration);
            return entries;
        }, {});
    }
    getTable() {
        const entriesByName = this.getEntriesByName();
        const table = new EasyTable();
        Object.entries(entriesByName).map(([name, values]) => {
            const stats = new Summary(values);
            table.cell('Name', name);
            table.cell('size', stats.size(), EasyTable.number(0));
            table.cell('min', stats.min(), EasyTable.number(2));
            table.cell('max', stats.max(), EasyTable.number(2));
            table.cell('median', stats.median(), EasyTable.number(2));
            table.cell('sum', stats.sum(), EasyTable.number(2));
            table.newRow();
        });
        table.sort(['sum|des']);
        return table.toString().trim();
    }
    getTotalTime() {
        return this.endTime - this.startTime;
    }
    async finalize() {
        if (!this.isEnabled)
            return;
        this.endTime = performance.now();
        await this.flush();
    }
    reset() {
        this.entries = [];
        this.observer?.disconnect();
    }
}
