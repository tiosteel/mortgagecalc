// This is an automatically generated file. Please do not change its contents manually!
import * as _mortgagecalc_db_types from './../mortgagecalc/db/types';
import * as _ from './..';
import * as __ from './../_';
export default { name: 'CalculatorService' }
export function _EuriborValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class extends _._cuidAspect(Base) {
        ID?: string;
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
Object.defineProperty(EuriborValue, 'name', { value: 'CalculatorService.EuriborValues' })
Object.defineProperty(EuriborValue, 'is_singular', { value: true })
export class EuriborValues extends Array<EuriborValue> {$count?: number}
Object.defineProperty(EuriborValues, 'name', { value: 'CalculatorService.EuriborValues' })

export declare const getEuribor: { (day: __.CdsDate | null, period: _mortgagecalc_db_types.euriborPeriod | null): number | null, __parameters: {day: __.CdsDate | null, period: _mortgagecalc_db_types.euriborPeriod | null}, __returns: number | null, kind: 'function'};