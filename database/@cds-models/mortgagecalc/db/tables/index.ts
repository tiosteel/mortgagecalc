// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './../../..';
import * as _mortgagecalc_db_types from './../types';
import * as __ from './../../../_';
export function _ContractAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Contract extends _._cuidAspect(_._managedAspect(Base)) {
        years?: number | null;
        amount?: _mortgagecalc_db_types.Money | null;
        dateStart?: __.CdsDate | null;
        dateFinish?: __.CdsDate | null;
        baseInterestRate?: _mortgagecalc_db_types.Percentages | null;
        baseEuriborRate?: _mortgagecalc_db_types.Percentages | null;
        monthlyPaymentDate?: number | null;
        ContractRates?: __.Composition.of.many<ContractRates>;
        ContractPayments?: __.Composition.of.many<ContractPayments>;
        ContractExtraPayments?: __.Composition.of.many<ContractPayments>;
        numberOfPeriods?: number | null;
        totalPayment?: _mortgagecalc_db_types.Money | null;
        contractTitle?: string | null;
        totalInterest?: _mortgagecalc_db_types.Money | null;
      static readonly actions: Record<never, never>
  };
}
export class Contract extends _ContractAspect(__.Entity) {static drafts: typeof Contract}
Object.defineProperty(Contract, 'name', { value: 'mortgagecalc.db.tables.Contracts' })
Object.defineProperty(Contract, 'is_singular', { value: true })
export class Contracts extends Array<Contract> {static drafts: typeof Contract
$count?: number}
Object.defineProperty(Contracts, 'name', { value: 'mortgagecalc.db.tables.Contracts' })

export function _ContractRateAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ContractRate extends _._cuidAspect(Base) {
        parent?: __.Association.to<Contract> | null;
        parent_ID?: string | null;
        validFrom?: __.CdsDate | null;
        euriborRate?: _mortgagecalc_db_types.Percentages | null;
        interestRate?: _mortgagecalc_db_types.Percentages | null;
      static readonly actions: Record<never, never>
  };
}
export class ContractRate extends _ContractRateAspect(__.Entity) {static drafts: typeof ContractRate}
Object.defineProperty(ContractRate, 'name', { value: 'mortgagecalc.db.tables.ContractRates' })
Object.defineProperty(ContractRate, 'is_singular', { value: true })
export class ContractRates extends Array<ContractRate> {static drafts: typeof ContractRate
$count?: number}
Object.defineProperty(ContractRates, 'name', { value: 'mortgagecalc.db.tables.ContractRates' })

export function _ContractPaymentAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ContractPayment extends _._cuidAspect(Base) {
        parent?: __.Association.to<Contract> | null;
        parent_ID?: string | null;
        paymentDate?: __.CdsDate | null;
        body?: _mortgagecalc_db_types.Money | null;
        interest?: _mortgagecalc_db_types.Money | null;
        required?: boolean | null;
        remainingDebt?: _mortgagecalc_db_types.Money | null;
        total?: _mortgagecalc_db_types.Money | null;
      static readonly actions: Record<never, never>
  };
}
export class ContractPayment extends _ContractPaymentAspect(__.Entity) {static drafts: typeof ContractPayment}
Object.defineProperty(ContractPayment, 'name', { value: 'mortgagecalc.db.tables.ContractPayments' })
Object.defineProperty(ContractPayment, 'is_singular', { value: true })
export class ContractPayments extends Array<ContractPayment> {static drafts: typeof ContractPayment
$count?: number}
Object.defineProperty(ContractPayments, 'name', { value: 'mortgagecalc.db.tables.ContractPayments' })

export function _EuriborValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class EuriborValue extends Base {
        day?: __.CdsDate;
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
