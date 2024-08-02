import { ApplicationService } from '@sap/cds';
import type { Request } from '@sap/cds';
import type { EuriborValue, Contract } from '#cds-models/db/tables';
import type { EuriborPeriod } from '#cds-models/db/types';
import ContractBuilder from "./lib/ContractBuilder";

export class CalculatorService extends ApplicationService {

    init(): Promise<void> {
        return super.init();
    }
    
    async getEuribor(day: Date, period: EuriborPeriod): Promise<number|undefined> {
        const { EuriborValues } = await import('#cds-models/db/tables');
        const result: EuriborValue|undefined = await SELECT.one.from(EuriborValues).where({day: {'<=': day}});
        
        if (!result) {
            throw new Error();
        }

        return result[period];
    }

    /**
     * @param { import('@sap/cds').Request } req
     */
    async calculateContract(req: Request) {
        const { Contracts } = await import('#cds-models/db/tables');

        const contract: Contract = await SELECT.one.from(Contracts, req.subject);
        const contractBuilder = new ContractBuilder(contract);
    }
}