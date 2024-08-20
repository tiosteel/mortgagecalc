// This is an automatically generated file. Please do not change its contents manually!
import * as _mortgagecalc_db_types from './../mortgagecalc/db/types';
import * as _ from './..';
import * as __ from './../_';
import * as _sap_common from './../sap/common';
import * as _mortgagecalc_db_tables from './../mortgagecalc/db/tables';
export default { name: 'CalculatorService' }
export function _ContractAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Contract extends _._cuidAspect(_._managedAspect(Base)) {
        ID?: string;
        createdAt?: __.CdsTimestamp | null;
    /**
    * Canonical user ID
    */
        createdBy?: _.User | null;
        modifiedAt?: __.CdsTimestamp | null;
    /**
    * Canonical user ID
    */
        modifiedBy?: _.User | null;
        years?: number | null;
        amount?: _mortgagecalc_db_types.Money | null;
        dateStart?: __.CdsDate | null;
        dateFinish?: __.CdsDate | null;
        baseInterestRate?: _mortgagecalc_db_types.Percentages | null;
        baseCentralBankRate?: _mortgagecalc_db_types.Percentages | null;
        monthlyPaymentDate?: number | null;
    /**
    * Type for an association to Currencies
    * 
    * See https://cap.cloud.sap/docs/cds/common#type-currency
    */
        Currency?: _.Currency | null;
        Currency_code?: string | null;
        ContractRates?: __.Composition.of.many<ContractRates>;
        ContractPayments?: __.Composition.of.many<ContractPayments>;
        ContractExtraPayments?: __.Composition.of.many<ContractPayments>;
        numberOfPeriods?: number | null;
        totalPayment?: _mortgagecalc_db_types.Money | null;
        contractTitle?: string | null;
        contractDescription?: string | null;
        totalInterest?: _mortgagecalc_db_types.Money | null;
      static readonly actions: {
        calculate: { (): Contracts, __parameters: Record<never, never>, __returns: Contracts, kind: 'action'}
      }
  };
}
export class Contract extends _ContractAspect(__.Entity) {static drafts: typeof Contract}
Object.defineProperty(Contract, 'name', { value: 'CalculatorService.Contracts' })
Object.defineProperty(Contract, 'is_singular', { value: true })
export class Contracts extends Array<Contract> {static drafts: typeof Contract
$count?: number}
Object.defineProperty(Contracts, 'name', { value: 'CalculatorService.Contracts' })

/**
* Code list for currencies
* 
* See https://cap.cloud.sap/docs/cds/common#entity-currencies
*/
export function _CurrencyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Currency extends _sap_common._CodeListAspect(Base) {
        code?: string;
        symbol?: string | null;
        minorUnit?: number | null;
      static readonly actions: Record<never, never>
  };
}
export class Currency extends _CurrencyAspect(__.Entity) {}
Object.defineProperty(Currency, 'name', { value: 'sap.common.Currencies' })
Object.defineProperty(Currency, 'is_singular', { value: true })
export class Currencies extends Array<Currency> {$count?: number}
Object.defineProperty(Currencies, 'name', { value: 'sap.common.Currencies' })

export function _ContractRateAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ContractRate extends _._cuidAspect(Base) {
        parent?: __.Association.to<_mortgagecalc_db_tables.Contract> | null;
        parent_ID?: string | null;
        validFrom?: __.CdsDate | null;
        centralBankRate?: _mortgagecalc_db_types.Percentages | null;
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
        parent?: __.Association.to<_mortgagecalc_db_tables.Contract> | null;
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

export declare const getEuribor: { (day: __.CdsDate | null, period: _mortgagecalc_db_types.CentralBankPeriod | null): number | null, __parameters: {day: __.CdsDate | null, period: _mortgagecalc_db_types.CentralBankPeriod | null}, __returns: number | null, kind: 'function'};