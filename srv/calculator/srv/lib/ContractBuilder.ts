import type { Contract, ContractPayments, ContractPayment, ContractRates, ContractRate } from '#cds-models/db/tables';
import type { Percentages } from '#cds-models/db/types';
import type { CdsDate } from '#cds-models/_';
import type IMortgageFormula from './MortgageFormula/IMortgageFormula';
import type { PersistanceProxy } from './types';

import MortgageFormula from './MortgageFormula/MortgageFormula';
import ContractPersistanceProxy from './ContractPersistanceProxy';

export default class ContractBuilder {

    initial: Contract;
    math: IMortgageFormula;
    dbProxy: PersistanceProxy;

    cleansedContractLayer: Contract;

    sortedContractLayer: Contract;

    finalContractLayer: Contract;

    constructor(contract: Contract, math: IMortgageFormula, dbProxy: PersistanceProxy) {
        this.initial = structuredClone(contract);
        this.math = math;
        this.dbProxy = dbProxy;
    }

    buildCleansedContract(contract: Contract = this.initial) {
        const cleansedContract = structuredClone(contract);
        cleansedContract.ContractPayments =
            cleansedContract.ContractPayments
                .filter(payment => !payment.required)
                .map(payment => ({ ...payment, remainingDebt: null }));
        this.cleansedContractLayer = cleansedContract;
    }

    buildSortedContract(contract: Contract = this.initial) {
        const sortedContract = structuredClone(contract);

        sortedContract.ContractPayments.sort((a, b) => b.paymentDate.localeCompare(a.paymentDate));
        sortedContract.ContractRates.sort((a, b) => b.validFrom.localeCompare(a.validFrom));

        this.sortedContractLayer = sortedContract;
    }

    buildFinalContract(contract: Contract = this.initial) {
        const finalContract = structuredClone(contract);

        const paymentsClone = structuredClone(contract.ContractPayments);
        const ratesClone = structuredClone(contract.ContractRates);

        let remainingDebt = contract.amount;
        let dateOfPayment = this.nextMonth(new Date(contract.dateStart));
        let interestRate = contract.baseInterestRate;
        let euriborRate = contract.baseEuriborRate;
        
        const resultPayments = this.createInitialResultPayments(contract);

        for (let numberOfPeriods = contract.numberOfPeriods - 1; numberOfPeriods > 0; numberOfPeriods--) {
            if (remainingDebt <= 0) break;

            dateOfPayment = this.nextMonth(dateOfPayment);
            while (ratesClone.length && new Date(ratesClone[0].validFrom) < dateOfPayment) {
                const firstRate = ratesClone.shift();
                interestRate = firstRate.interestRate;
                euriborRate = firstRate.euriborRate;
            } 

            const ppmt = this.math.PPMT(this.getMonthlyRateMath(interestRate, euriborRate), 1, contract.numberOfPeriods, remainingDebt);
            const ipmt = this.math.IPMT(this.getMonthlyRateMath(interestRate, euriborRate), 1, contract.numberOfPeriods, remainingDebt);
            remainingDebt += ppmt;

            while (paymentsClone.some(payment => payment.paymentDate === this.dateToString(dateOfPayment))) {
                const extraPayment = paymentsClone.shift();
                resultPayments.push(extraPayment);
                remainingDebt -= extraPayment.body;
            }

            const requiredPayment: ContractPayment = {
                body: ppmt,
                interest: ipmt,
                paymentDate: this.dateToString(dateOfPayment),
                remainingDebt: remainingDebt,
                total: ppmt + ipmt
            }

            resultPayments.push(requiredPayment);
        }

        finalContract.ContractPayments = resultPayments;

        this.finalContractLayer = finalContract;
    }

    createInitialResultPayments(contract: Contract): ContractPayments {
        return [
            {
                paymentDate: this.dateToString(this.nextMonth(contract.dateStart)),
                body: 0,
                interest: this.math.IPMT(
                    this.getMonthlyRateMath(contract.baseInterestRate, contract.baseEuriborRate),
                    1,
                    contract.numberOfPeriods,
                    contract.amount
                )
            }
        ];
    }

    nextMonth(date: Date | CdsDate): Date {
        const date2process = (this.isCdsDate(date)) ? new Date(date) : date;

        return new Date(new Date(date2process.getFullYear(), date2process.getMonth() + 1, 1));
    }

    isCdsDate(date: string | Date | CdsDate): date is CdsDate {
        if (date instanceof Date) return false;
        return /[0-9]{4}-[0-9]{2}-[0-9]{2}/g.test(date);
    }

    dateToString(date: Date): CdsDate {
        return date.toISOString().split('T').at(0) as CdsDate;
    }

    getMonthlyRateMath(interestRate: Percentages, EuriborRate: Percentages): number {
        return (interestRate + EuriborRate) / 12 /** months */ / 100 /** % */;
    }
}