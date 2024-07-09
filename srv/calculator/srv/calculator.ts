import { ApplicationService } from "@sap/cds";
import type { EuriborValue } from '#cds-models/db/tables';
import type { euriborPeriod } from '#cds-models/db/types';

export class CalculatorService extends ApplicationService {

    init(): Promise<void> {
        return super.init();
    }
    
    async getEuribor(day: Date, period: euriborPeriod): Promise<number|undefined> {
        const { EuriborValues: ServiceEuriborValues } = await import('#cds-models/CalculatorService');
        const { EuriborValues } = await import('#cds-models/db/tables');
        const result: EuriborValue|undefined = await SELECT.one.from(EuriborValues).where({day: {'<=': day}});
        
        return result?.[period];
    }
}