import { ApplicationService, log } from '@sap/cds';
import type { Request } from '@sap/cds';
import type { CentralBankValue, Contract } from '#cds-models/db/tables';
import type { CentralBankPeriod } from '#cds-models/db/types';
import ContractBuilder from "./lib/ContractBuilder/ContractBuilder";

import MortgageFormula from './lib/MortgageFormula/MortgageFormula';
import ContractPersistanceProxy from './lib/ContractPersistanceProxy';
import { ContractBuilderState } from './lib/ContractBuilder/ContractBuilderState';

export class CalculatorService extends ApplicationService {

    init(): Promise<void> {
        this.on('calculate', this.onCalculate);

        return super.init();
    }

    async getEuribor(day: Date, period: CentralBankPeriod): Promise<number | undefined> {
        const { CentralBankValues } = await import('#cds-models/db/tables');
        const result: CentralBankValue | undefined = await SELECT.one.from(CentralBankValues).where({ day: { '<=': day } }).orderBy('day desc');

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

        contractBuilder.buildPreCleansedContract(contractBuilder.initial);
        contractBuilder.buildSortedContract(contractBuilder.cleansedContractLayer);
        contractBuilder.buildCalculatedContract(contractBuilder.sortedContractLayer, ContractBuilderState);
        contractBuilder.buildPostCleansedContract(contractBuilder.calculatedContractLayer);

        await UPDATE(req.subject).with(contractBuilder.postCleansedContractLayer);
    }
}