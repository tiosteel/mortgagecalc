// This is an automatically generated file. Please do not change its contents manually!
import * as __ from './../../../_';
import * as _sap_common from './../../../sap/common';
import * as _ from './../../..';
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

export function _ContractStatusAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ContractStatus extends _sap_common._CodeListAspect(Base) {
        code?: string;
      static readonly actions: Record<never, never>
  };
}
export class ContractStatus extends _ContractStatusAspect(__.Entity) {}
Object.defineProperty(ContractStatus, 'name', { value: 'mortgagecalc.db.tables.ContractStatuses' })
Object.defineProperty(ContractStatus, 'is_singular', { value: true })
export class ContractStatuses extends Array<ContractStatus> {$count?: number}
Object.defineProperty(ContractStatuses, 'name', { value: 'mortgagecalc.db.tables.ContractStatuses' })

export function _ContractAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Contract extends _._cuidAspect(Base) {
        years?: number | null;
        amount?: __.CdsDate | null;
        dateStart?: __.CdsDate | null;
        dateFinish?: __.CdsDate | null;
        baseInterestRate?: number | null;
        monthlyPaymentDate?: number | null;
        ContractRates?: __.Composition.of.many<ContractRates>;
        ContractBills?: __.Composition.of.many<ContractBills>;
        ContractPayments?: __.Composition.of.many<ContractPayments>;
        Status?: __.Association.to<ContractStatus> | null;
        Status_code?: string | null;
      static readonly actions: Record<never, never>
  };
}
export class Contract extends _ContractAspect(__.Entity) {}
Object.defineProperty(Contract, 'name', { value: 'mortgagecalc.db.tables.Contracts' })
Object.defineProperty(Contract, 'is_singular', { value: true })
export class Contracts extends Array<Contract> {$count?: number}
Object.defineProperty(Contracts, 'name', { value: 'mortgagecalc.db.tables.Contracts' })

export function _ContractRateAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ContractRate extends _._cuidAspect(_._temporalAspect(Base)) {
        parent?: __.Association.to<Contract> | null;
        parent_ID?: string | null;
        euriborRate?: number | null;
        interestRate?: number | null;
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
        parent?: __.Association.to<Contract> | null;
        parent_ID?: string | null;
        paymentDate?: __.CdsDate | null;
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
        parent?: __.Association.to<Contract> | null;
        parent_ID?: string | null;
        body?: number | null;
        interest?: number | null;
      static readonly actions: Record<never, never>
  };
}
export class ContractPayment extends _ContractPaymentAspect(__.Entity) {}
Object.defineProperty(ContractPayment, 'name', { value: 'mortgagecalc.db.tables.ContractPayments' })
Object.defineProperty(ContractPayment, 'is_singular', { value: true })
export class ContractPayments extends Array<ContractPayment> {$count?: number}
Object.defineProperty(ContractPayments, 'name', { value: 'mortgagecalc.db.tables.ContractPayments' })
