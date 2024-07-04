import { ApplicationService } from "@sap/cds";
import type { EuriborValue } from '#cds-models/mortgagecalc/db/tables';
import type { euriborPeriod } from '#cds-models/mortgagecalc/db/types';

export class CalculatorService extends ApplicationService {

    init(): Promise<void> {
        return super.init();
    }
    
    async getEuribor(day: Date, period: euriborPeriod): Promise<number|undefined> {
        const { EuriborValues } = await import('#cds-models/mortgagecalc/db/tables');
        const result: EuriborValue|undefined = await SELECT.one.from(EuriborValues).where({day: {'<=': day}});
        
        return result?.[period];
    }
}