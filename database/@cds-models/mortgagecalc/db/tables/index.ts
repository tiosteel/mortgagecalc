// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './../../..';
import * as __ from './../../../_';
export function _EuriborValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class extends _._cuidAspect(Base) {
        day?: __.CdsDate | null;
        weekly?: number | null;
        monthly1?: number | null;
        monthly3?: number | null;
        monthly6?: number | null;
        yearly?: number | null;
      static readonly actions: Record<never, never>
  };
}
export class EuriborValue extends _EuriborValueAspect(__.Entity) {}
Object.defineProperty(EuriborValue, 'name', { value: 'mortgagecalc.db.tables.EuriborValues' })
Object.defineProperty(EuriborValue, 'is_singular', { value: true })
export class EuriborValues extends Array<EuriborValue> {$count?: number}
Object.defineProperty(EuriborValues, 'name', { value: 'mortgagecalc.db.tables.EuriborValues' })
