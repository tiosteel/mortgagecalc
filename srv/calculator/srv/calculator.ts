import { ApplicationService } from "@sap/cds";
import type { EuriborValue } from '@mortgagecalc/database/@cds-models/mortgagecalc/db/tables';
import type { euriborPeriod } from '@mortgagecalc/database/@cds-models/mortgagecalc/db/types';

export class CalculatorService extends ApplicationService {

    init(): Promise<void> {
        return super.init();
    }
    
    async getEuribor(day: Date, period: euriborPeriod): Promise<number|undefined> {
        const { EuriborValues: ServiceEuriborValues } = await import('../@cds-models/CalculatorService/index.js')
        const { EuriborValues } = await import('@mortgagecalc/database/@cds-models/mortgagecalc/db/tables/index.js');
        const result: EuriborValue|undefined = await SELECT.one.from(EuriborValues).where({day: {'<=': day}});
        
        return result?.[period];
    }
}