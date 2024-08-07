import { Contract, ContractPayments, ContractRates } from "@mortgagecalc/database/tables";
import type { IContractBuilderState } from "./types";
import type { Percentages, Money } from '#cds-models/db/types';
import type { CdsDate } from '#cds-models/_';

export class ContractBuilderState implements IContractBuilderState {
    
    euriborRate: Percentages;
    interestRate: Percentages;
    remainingDebt: Money;
    paymentDate: Date;

    payments: ContractPayments;
    rates: ContractRates;
    
    constructor(contract: Contract) {
        this.euriborRate = contract.baseEuriborRate;
        this.interestRate = contract.baseInterestRate;
        this.remainingDebt = contract.amount;
        this.paymentDate = new Date(contract.dateStart);
        this.payments = structuredClone(contract.ContractPayments);
        this.rates = structuredClone(contract.ContractRates);
    }

    get paymentDateCDS(): CdsDate {
        const date = this.paymentDate;
        const result = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}` as CdsDate;
        return result;
    }

    get monthlyRate4Formula(): number {
        return (this.interestRate + this.euriborRate) / 12 /** months */ / 100 /** % */;
    }
}