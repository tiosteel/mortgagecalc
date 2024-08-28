// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './../../..';
import * as _mortgagecalc_db_types from './../types';
import * as __ from './../../../_';
export function _ContractAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Contract extends _._cuidAspect(_._managedAspect(Base)) {
        declare years?: number | null;
        declare amount?: _mortgagecalc_db_types.Money | null;
        declare dateStart?: __.CdsDate | null;
        declare dateFinish?: __.CdsDate | null;
        declare baseInterestRate?: _mortgagecalc_db_types.Percentages | null;
        declare baseCentralBankRate?: _mortgagecalc_db_types.Percentages | null;
        declare monthlyPaymentDate?: number | null;
    /**
    * Type for an association to Currencies
    * 
    * See https://cap.cloud.sap/docs/cds/common#type-currency
    */
        declare Currency?: _.Currency | null;
        declare Currency_code?: string | null;
        declare ContractRates?: __.Composition.of.many<ContractRates>;
        declare ContractPayments?: __.Composition.of.many<ContractPayments>;
        declare ContractExtraPayments?: __.Composition.of.many<ContractExtraPayments>;
        declare numberOfPeriods?: number | null;
        declare totalPayment?: _mortgagecalc_db_types.Money | null;
        declare contractTitle?: string | null;
        declare contractDescription?: string | null;
        declare totalInterest?: _mortgagecalc_db_types.Money | null;
      declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & Record<never, never>
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
        declare parent?: __.Association.to<Contract> | null;
        declare parent_ID?: string | null;
        declare validFrom?: __.CdsDate | null;
        declare centralBankRate?: _mortgagecalc_db_types.Percentages | null;
        declare interestRate?: _mortgagecalc_db_types.Percentages | null;
      declare static readonly actions: typeof _.cuid.actions & Record<never, never>
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
        declare parent?: __.Association.to<Contract> | null;
        declare parent_ID?: string | null;
        declare paymentDate?: __.CdsDate | null;
        declare body?: _mortgagecalc_db_types.Money | null;
        declare interest?: _mortgagecalc_db_types.Money | null;
        declare required?: boolean | null;
        declare remainingDebt?: _mortgagecalc_db_types.Money | null;
        declare total?: _mortgagecalc_db_types.Money | null;
      declare static readonly actions: typeof _.cuid.actions & Record<never, never>
  };
}
export class ContractPayment extends _ContractPaymentAspect(__.Entity) {static drafts: typeof ContractPayment}
Object.defineProperty(ContractPayment, 'name', { value: 'mortgagecalc.db.tables.ContractPayments' })
Object.defineProperty(ContractPayment, 'is_singular', { value: true })
export class ContractPayments extends Array<ContractPayment> {static drafts: typeof ContractPayment
$count?: number}
Object.defineProperty(ContractPayments, 'name', { value: 'mortgagecalc.db.tables.ContractPayments' })

export function _ContractExtraPaymentAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ContractExtraPayment extends Base {
        declare ID?: string;
        declare parent?: __.Association.to<Contract> | null;
        declare parent_ID?: string | null;
        declare paymentDate?: __.CdsDate | null;
        declare body?: _mortgagecalc_db_types.Money | null;
        declare interest?: _mortgagecalc_db_types.Money | null;
        declare required?: boolean | null;
        declare remainingDebt?: _mortgagecalc_db_types.Money | null;
        declare total?: _mortgagecalc_db_types.Money | null;
      declare static readonly actions: Record<never, never>
  };
}
export class ContractExtraPayment extends _ContractExtraPaymentAspect(__.Entity) {static drafts: typeof ContractExtraPayment}
Object.defineProperty(ContractExtraPayment, 'name', { value: 'mortgagecalc.db.tables.ContractExtraPayments' })
Object.defineProperty(ContractExtraPayment, 'is_singular', { value: true })
export class ContractExtraPayments extends Array<ContractExtraPayment> {static drafts: typeof ContractExtraPayment
$count?: number}
Object.defineProperty(ContractExtraPayments, 'name', { value: 'mortgagecalc.db.tables.ContractExtraPayments' })

export function _EuriborValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class EuriborValue extends Base {
        declare day?: __.CdsDate;
        declare weekly?: number | null;
        declare monthly1?: number | null;
        declare monthly3?: number | null;
        declare monthly6?: number | null;
        declare yearly?: number | null;
      declare static readonly actions: Record<never, never>
  };
}
export class EuriborValue extends _EuriborValueAspect(__.Entity) {}
Object.defineProperty(EuriborValue, 'name', { value: 'mortgagecalc.db.tables.EuriborValues' })
Object.defineProperty(EuriborValue, 'is_singular', { value: true })
export class EuriborValues extends Array<EuriborValue> {$count?: number}
Object.defineProperty(EuriborValues, 'name', { value: 'mortgagecalc.db.tables.EuriborValues' })
