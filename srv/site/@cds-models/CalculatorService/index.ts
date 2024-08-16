// This is an automatically generated file. Please do not change its contents manually!
import * as __ from './../_';
export default { name: 'CalculatorService' }
/**
* Head entity - planned contract to be calculated
*/
export function _ContractAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Contract extends Base {
        ID?: string;
        years?: number | null;
        amount?: number | null;
        dateStart?: __.CdsDate | null;
        dateFinish?: __.CdsDate | null;
        baseInterestRate?: number | null;
        baseEuriborRate?: number | null;
        monthlyPaymentDate?: number | null;
        ContractRates?: __.Composition.of.many<ContractRates>;
        ContractPayments?: __.Composition.of.many<ContractPayments>;
        numberOfPeriods?: number | null;
        totalInterest?: number | null;
        totalPayment?: number | null;
        totalOverpayPercentage?: number | null;
        IsActiveEntity?: boolean;
        HasActiveEntity?: boolean;
        HasDraftEntity?: boolean;
        DraftAdministrativeData?: __.Association.to<DraftAdministrativeData> | null;
        DraftAdministrativeData_DraftUUID?: string | null;
        SiblingEntity?: __.Association.to<Contract> | null;
        SiblingEntity_ID?: string | null;
        SiblingEntity_IsActiveEntity?: boolean | null;
      static readonly actions: {
        calculate: { (): Contracts, __parameters: Record<never, never>, __returns: Contracts, kind: 'action'}
        draftPrepare: { (SideEffectsQualifier: string | null): Contracts, __parameters: {SideEffectsQualifier: string | null}, __returns: Contracts, kind: 'action'}
        draftActivate: { (): Contracts, __parameters: Record<never, never>, __returns: Contracts, kind: 'action'}
        draftEdit: { (PreserveChanges: boolean | null): Contracts, __parameters: {PreserveChanges: boolean | null}, __returns: Contracts, kind: 'action'}
      }
  };
}
export class Contract extends _ContractAspect(__.Entity) {}
Object.defineProperty(Contract, 'name', { value: 'CalculatorService.Contracts' })
Object.defineProperty(Contract, 'is_singular', { value: true })
export class Contracts extends Array<Contract> {$count?: number}
Object.defineProperty(Contracts, 'name', { value: 'CalculatorService.Contracts' })

/**
* Contract rates (euribor + interest rate) is not a static thing. Euribor part is recalculated every 6 months. Base rate can be adjusted by discounts or fees
*/
export function _ContractRateAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ContractRate extends Base {
        ID?: string;
        parent?: __.Association.to<Contract> | null;
        parent_IsActiveEntity?: boolean | null;
        parent_ID?: string | null;
        validFrom?: __.CdsTimestamp | null;
        euriborRate?: number | null;
        interestRate?: number | null;
        IsActiveEntity?: boolean;
        HasActiveEntity?: boolean;
        HasDraftEntity?: boolean;
        DraftAdministrativeData?: __.Association.to<DraftAdministrativeData> | null;
        DraftAdministrativeData_DraftUUID?: string | null;
        SiblingEntity?: __.Association.to<ContractRate> | null;
        SiblingEntity_ID?: string | null;
        SiblingEntity_IsActiveEntity?: boolean | null;
      static readonly actions: {
        draftPrepare: { (SideEffectsQualifier: string | null): ContractRates, __parameters: {SideEffectsQualifier: string | null}, __returns: ContractRates, kind: 'action'}
      }
  };
}
export class ContractRate extends _ContractRateAspect(__.Entity) {}
Object.defineProperty(ContractRate, 'name', { value: 'CalculatorService.ContractRates' })
Object.defineProperty(ContractRate, 'is_singular', { value: true })
export class ContractRates extends Array<ContractRate> {$count?: number}
Object.defineProperty(ContractRates, 'name', { value: 'CalculatorService.ContractRates' })

/**
* Expected contract payments. Both regular and extra.
*/
export function _ContractPaymentAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ContractPayment extends Base {
        ID?: string;
        parent?: __.Association.to<Contract> | null;
        parent_IsActiveEntity?: boolean | null;
        parent_ID?: string | null;
        paymentDate?: __.CdsDate | null;
        body?: number | null;
        interest?: number | null;
        required?: boolean | null;
        remainingDebt?: number | null;
        total?: number | null;
        IsActiveEntity?: boolean;
        HasActiveEntity?: boolean;
        HasDraftEntity?: boolean;
        DraftAdministrativeData?: __.Association.to<DraftAdministrativeData> | null;
        DraftAdministrativeData_DraftUUID?: string | null;
        SiblingEntity?: __.Association.to<ContractPayment> | null;
        SiblingEntity_ID?: string | null;
        SiblingEntity_IsActiveEntity?: boolean | null;
      static readonly actions: {
        draftPrepare: { (SideEffectsQualifier: string | null): ContractPayments, __parameters: {SideEffectsQualifier: string | null}, __returns: ContractPayments, kind: 'action'}
      }
  };
}
export class ContractPayment extends _ContractPaymentAspect(__.Entity) {}
Object.defineProperty(ContractPayment, 'name', { value: 'CalculatorService.ContractPayments' })
Object.defineProperty(ContractPayment, 'is_singular', { value: true })
export class ContractPayments extends Array<ContractPayment> {$count?: number}
Object.defineProperty(ContractPayments, 'name', { value: 'CalculatorService.ContractPayments' })

export function _DraftAdministrativeDataAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class DraftAdministrativeData extends Base {
        DraftUUID?: string;
        CreationDateTime?: __.CdsTimestamp | null;
        CreatedByUser?: string | null;
        DraftIsCreatedByMe?: boolean | null;
        LastChangeDateTime?: __.CdsTimestamp | null;
        LastChangedByUser?: string | null;
        InProcessByUser?: string | null;
        DraftIsProcessedByMe?: boolean | null;
      static readonly actions: Record<never, never>
  };
}
export class DraftAdministrativeData extends _DraftAdministrativeDataAspect(__.Entity) {}
Object.defineProperty(DraftAdministrativeData, 'name', { value: 'CalculatorService.DraftAdministrativeData' })
Object.defineProperty(DraftAdministrativeData, 'is_singular', { value: true })
export class DraftAdministrativeData_ extends Array<DraftAdministrativeData> {$count?: number}
Object.defineProperty(DraftAdministrativeData_, 'name', { value: 'CalculatorService.DraftAdministrativeData' })

export declare const getEuribor: { (day: __.CdsDate | null, period: string | null): number | null, __parameters: {day: __.CdsDate | null, period: string | null}, __returns: number | null, kind: 'function'};