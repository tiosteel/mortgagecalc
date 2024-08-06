import { Contract } from '#cds-models/db/tables';
import type IMortgageFormula from './MortgageFormula/IMortgageFormula';
import type { PersistanceProxy } from './types';

import MortgageFormula from './MortgageFormula/MortgageFormula';
import ContractPersistanceProxy from './ContractPersistanceProxy';


export default class ContractBuilder {

    initial: Contract;
    math: IMortgageFormula;
    dbProxy: PersistanceProxy;
    basicTimeSheetLayer: Contract;

    appliedDiscountsLayer: Contract;

    consideredExtraPaymentsLayer: Contract;

    constructor(contract: Contract, math: IMortgageFormula, dbProxy: PersistanceProxy) {
        this.initial = structuredClone(contract);
        this.math = math;
        this.dbProxy = dbProxy;
    }

    buildBasicTimeSheetLayer(contract: Contract = this.initial) {
        const layer: Contract = structuredClone(contract);

        const result: any = this.math.FV(contract.baseInterestRate, contract.years * 12 + 1, 1000, contract.amount);

        this.basicTimeSheetLayer = layer;
    }

    buildAppliedDiscountsLayer(contract: Contract = this.initial) {
        const layer: Contract = structuredClone(contract);

        this.appliedDiscountsLayer = layer;
    }

    buildConsideredExtraPaymentsLayer(contract: Contract = this.initial) {
        const layer: Contract = structuredClone(contract);

        this.consideredExtraPaymentsLayer = layer;
    };
}