import type { CdsDate } from '#cds-models/_';
import type { Contract, ContractPayments, ContractRates } from '#cds-models/db/tables';
import type { Percentages, Money } from '#cds-models/db/types';
export interface IContractBuilderState {
    payments: ContractPayments,
    rates: ContractRates,
    remainingDebt: Money,
    paymentDate: Date,
    interestRate: Percentages,
    centralBankRate: Percentages,
    get paymentDateCDS(): CdsDate;
    get monthlyRate4Formula(): number;
}
export interface IContractBuilderStateConstruct {
    new (contract: Contract): IContractBuilderState;
}