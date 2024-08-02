// This is an automatically generated file. Please do not change its contents manually!
import * as _mortgagecalc_db_types from './../mortgagecalc/db/types';
import * as _ from './..';
import * as __ from './../_';
import * as _mortgagecalc_db_tables from './../mortgagecalc/db/tables';
export default { name: 'CalculatorService' }
export function _ContractAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Contract extends _._cuidAspect(Base) {
        ID?: string;
        years?: number | null;
        amount?: __.CdsDate | null;
        dateStart?: __.CdsDate | null;
        dateFinish?: __.CdsDate | null;
        baseInterestRate?: _mortgagecalc_db_types.Percentages | null;
        monthlyPaymentDate?: number | null;
        ContractRates?: __.Composition.of.many<ContractRates>;
        ContractBills?: __.Composition.of.many<ContractBills>;
        ContractExtraPayments?: __.Composition.of.many<ContractPayments>;
      static readonly actions: {
        calculate: { (): Contracts, __parameters: Record<never, never>, __returns: Contracts, kind: 'action'}
      }
  };
}
export class Contract extends _ContractAspect(__.Entity) {}
Object.defineProperty(Contract, 'name', { value: 'CalculatorService.Contracts' })
Object.defineProperty(Contract, 'is_singular', { value: true })
export class Contracts extends Array<Contract> {$count?: number}
Object.defineProperty(Contracts, 'name', { value: 'CalculatorService.Contracts' })

export function _ContractRateAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ContractRate extends _._cuidAspect(_._temporalAspect(Base)) {
        parent?: __.Association.to<_mortgagecalc_db_tables.Contract> | null;
        parent_ID?: string | null;
        euriborRate?: _mortgagecalc_db_types.Percentages | null;
        interestRate?: _mortgagecalc_db_types.Percentages | null;
      static readonly actions: Record<never, never>
  };
}
export class ContractRate extends _ContractRateAspect(__.Entity) {}
Object.defineProperty(ContractRate, 'name', { value: 'mortgagecalc.db.tables.ContractRates' })
Object.defineProperty(ContractRate, 'is_singular', { value: true })
export class ContractRates extends Array<ContractRate> {$count?: number}
Object.defineProperty(ContractRates, 'name', { value: 'mortgagecalc.db.tables.ContractRates' })

export function _ContractBillAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ContractBill extends _._cuidAspect(Base) {
        parent?: __.Association.to<_mortgagecalc_db_tables.Contract> | null;
        parent_ID?: string | null;
        paymentDate?: __.CdsDate | null;
        interestValue?: _mortgagecalc_db_types.Money | null;
      static readonly actions: Record<never, never>
  };
}
export class ContractBill extends _ContractBillAspect(__.Entity) {}
Object.defineProperty(ContractBill, 'name', { value: 'mortgagecalc.db.tables.ContractBills' })
Object.defineProperty(ContractBill, 'is_singular', { value: true })
export class ContractBills extends Array<ContractBill> {$count?: number}
Object.defineProperty(ContractBills, 'name', { value: 'mortgagecalc.db.tables.ContractBills' })

export function _ContractPaymentAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ContractPayment extends _._cuidAspect(Base) {
        parent?: __.Association.to<_mortgagecalc_db_tables.Contract> | null;
        parent_ID?: string | null;
        body?: _mortgagecalc_db_types.Money | null;
        interest?: _mortgagecalc_db_types.Money | null;
        total?: _mortgagecalc_db_types.Money | null;
      static readonly actions: Record<never, never>
  };
}
export class ContractPayment extends _ContractPaymentAspect(__.Entity) {}
Object.defineProperty(ContractPayment, 'name', { value: 'mortgagecalc.db.tables.ContractPayments' })
Object.defineProperty(ContractPayment, 'is_singular', { value: true })
export class ContractPayments extends Array<ContractPayment> {$count?: number}
Object.defineProperty(ContractPayments, 'name', { value: 'mortgagecalc.db.tables.ContractPayments' })

export declare const getEuribor: { (day: __.CdsDate | null, period: _mortgagecalc_db_types.EuriborPeriod | null): number | null, __parameters: {day: __.CdsDate | null, period: _mortgagecalc_db_types.EuriborPeriod | null}, __returns: number | null, kind: 'function'};