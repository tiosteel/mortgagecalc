import { ApplicationService, log } from '@sap/cds';
import type { Request } from '@sap/cds';
import type { EuriborValue, Contract } from '#cds-models/db/tables';
import type { CentralBankPeriod } from '#cds-models/db/types';
import ContractBuilder from "./lib/ContractBuilder/ContractBuilder";

import MortgageFormula from './lib/MortgageFormula/MortgageFormula';
import ContractPersistanceProxy from './lib/ContractPersistanceProxy';
import { ContractBuilderState } from './lib/ContractBuilder/ContractBuilderState';
import { QueryHelper } from '@mortgagecalc/foundation';

export class CalculatorService extends ApplicationService {

    init(): Promise<void> {
        this.on('calculate', this.onCalculate);

        return super.init();
    }

    async getEuribor(day: Date, period: CentralBankPeriod): Promise<number | undefined> {
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
        const selectQuery = SELECT.one.from(req.subject);
        QueryHelper.addAllExpands2Select(selectQuery);

        const contract: Contract = await selectQuery;

        const contractBuilder = new ContractBuilder(contract, MortgageFormula, ContractPersistanceProxy);

        contractBuilder.buildPreCleansedContract(contractBuilder.initial);
        contractBuilder.buildSortedContract(contractBuilder.cleansedContractLayer);
        contractBuilder.buildCalculatedContract(contractBuilder.sortedContractLayer, ContractBuilderState);
        contractBuilder.buildPostCleansedContract(contractBuilder.calculatedContractLayer);

        await UPDATE(req.subject).with(contractBuilder.postCleansedContractLayer);
    }
}