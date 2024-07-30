import type { Contract } from '#cds-models/db/tables';

// base types for mixins https://www.typescriptlang.org/docs/handbook/mixins.html
export type Constructor<T = any> = new (...args: any[]) => T;
export type GConstructor<T = {}> = new (...args: any[]) => T;

// restricted types for mixins
export type WithBaseContract = GConstructor<{ initial: Contract }>;