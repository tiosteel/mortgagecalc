import type { Contract, ContractPayments} from '#cds-models/db/tables';
import type { CdsDate } from '#cds-models/_';
import type IMortgageFormula from '../MortgageFormula/IMortgageFormula';
import type { PersistanceProxy } from '../types';
import { IContractBuilderState, IContractBuilderStateConstruct } from './types';

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

        sortedContract.ContractPayments.sort((a, b) => a.paymentDate.localeCompare(b.paymentDate));
        sortedContract.ContractRates.sort((a, b) => a.validFrom.localeCompare(b.validFrom));

        this.sortedContractLayer = sortedContract;
    }

    buildFinalContract(contract: Contract = this.initial, ContractBuilderState: IContractBuilderStateConstruct) {
        const finalContract = structuredClone(contract);
        const state = new ContractBuilderState(contract);

        const resultPayments = this.createFirstPeriodResultPayments(state, contract.numberOfPeriods);

        /** and that's why we calculate for 1 period lesser */
        for (let numberOfPeriods = contract.numberOfPeriods - 1; numberOfPeriods > 0; numberOfPeriods--) {
            if (state.remainingDebt <= 0) break;

            state.paymentDate = this.nextMonth(state.paymentDate);
            this.calculateRatesChange(state);

            const ppmt = this.math.PPMT(state.monthlyRate4Formula, 1, numberOfPeriods, state.remainingDebt);
            const ipmt = this.math.IPMT(state.monthlyRate4Formula, 1, numberOfPeriods, state.remainingDebt);
            state.remainingDebt += state.remainingDebt;

            this.calculateExtraPayments(state, resultPayments);

            resultPayments.push({
                body: ppmt,
                interest: ipmt,
                paymentDate: state.paymentDateCDS,
                remainingDebt: state.remainingDebt,
                total: ppmt + ipmt
            });
        }

        finalContract.ContractPayments = resultPayments;

        this.finalContractLayer = finalContract;
    }

    protected calculateRatesChange(state: IContractBuilderState): void {
        const { rates, paymentDate } = state;
        while (rates.length && new Date(rates.at(0).validFrom) < paymentDate) {
            const firstRate = rates.shift();
            state.interestRate = firstRate.interestRate;
            state.euriborRate = firstRate.euriborRate;
        } 
    }

    /**
     * @description this function adds extra payments to the resultPayments according to the state
     * @param {IContractBuilderState} state state of main calculation
     * @param {ContractPayments} resultPayments array to collect all payments after calculation
     */
    protected calculateExtraPayments(state: IContractBuilderState, resultPayments: ContractPayments) {
        while (state.payments.some(payment => payment.paymentDate === state.paymentDateCDS)) {
            const extraPayment = state.payments.shift();
            resultPayments.push(extraPayment);
            state.remainingDebt += extraPayment.body;
        }
    }

    /**
     * @description the logic for a first period is different because there's no obligatory payment there, yet extra payments still can be done
     * @param {IContractBuilderState} state state of the main calculation
     * @param {number} numberOfPeriods number of periods
     * @returns {ContractPayments} the list of contract payments after first period
     */
    protected createFirstPeriodResultPayments(state: IContractBuilderState, numberOfPeriods: number): ContractPayments {
        state.paymentDate = this.nextMonth(state.paymentDate)
        const resultPayments = [
            {
                paymentDate: state.paymentDateCDS,
                body: 0, // remember: this is only percentage payment, so the debt body is not touched here
                interest: this.math.IPMT(state.monthlyRate4Formula, 1, numberOfPeriods, state.remainingDebt)
            }
        ];

        this.calculateExtraPayments(state, resultPayments)

        return resultPayments;
    }

    nextMonth(date: Date | CdsDate): Date {
        const date2process = (this.isCdsDate(date)) ? new Date(date) : date;

        return new Date(date2process.getFullYear(), date2process.getMonth() + 1, 1);
    }

    isCdsDate(date: string | Date | CdsDate): date is CdsDate {
        if (date instanceof Date) return false;
        return /[0-9]{4}-[0-9]{2}-[0-9]{2}/g.test(date);
    }
}