import { ApplicationService, log } from '@sap/cds';
import type { Request } from '@sap/cds';
import type { EuriborValue, Contract } from '#cds-models/db/tables';
import type { EuriborPeriod } from '#cds-models/db/types';
import ContractBuilder from "./lib/ContractBuilder/ContractBuilder";

import MortgageFormula from './lib/MortgageFormula/MortgageFormula';
import ContractPersistanceProxy from './lib/ContractPersistanceProxy';
import { ContractBuilderState } from './lib/ContractBuilder/ContractBuilderState';

export class CalculatorService extends ApplicationService {

    init(): Promise<void> {
        this.on('calculate', this.onCalculate);

        return super.init();
    }

    async getEuribor(day: Date, period: EuriborPeriod): Promise<number | undefined> {
        const { EuriborValues } = await import('#cds-models/db/tables');
        const result: EuriborValue | undefined = await SELECT.one.from(EuriborValues).where({ day: { '<=': day } }).orderBy('day desc');

        if (!result) {
            throw new Error();
        }

        return result[period];
    }

    /**
     * @param { import('@sap/cds').Request } req
     */
    async onCalculate(req: Request) {
        const contract: Contract = await SELECT.one.from(req.subject)
            .columns(contract => {
                contract`.*`;
                contract.ContractPayments('*');
                contract.ContractRates('*');
            });

        const contractBuilder = new ContractBuilder(contract, MortgageFormula, ContractPersistanceProxy);

        contractBuilder.buildCleansedContract(contractBuilder.initial);
        contractBuilder.buildSortedContract(contractBuilder.cleansedContractLayer);
        contractBuilder.buildFinalContract(contractBuilder.sortedContractLayer, ContractBuilderState);

        await UPDATE(req.subject).with(contractBuilder.finalContractLayer);
    }
}