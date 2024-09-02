import cds from "@sap/cds";
import { ApplicationService, Request, ResultSet } from "@sap/cds";
import type { Contract } from "#cds-models/SiteService";
import { QueryHelper } from '@mortgagecalc/foundation';

export class SiteService extends ApplicationService {
    async init(): Promise<void> {
        const { Contracts } = await import('#cds-models/SiteService');

        this.before(['CREATE', 'UPDATE'], Contracts.name, this.onBeforeContractActicate);
        this.after(['CREATE', 'UPDATE'], Contracts.name, this.onAfterContractActicate);

        return super.init();
    }

    onBeforeContractActicate(req: Request) {
        QueryHelper.removeCalculatedFields(req, this.entities.Contracts);
    }

    async onAfterContractActicate(res: any, req: any): Promise<void> {
        const ID: Contract["ID"] = req.data.ID;

        req.on('succeeded', async () => {
            const srv = await cds.connect.to('ExternalCalculatorService');
            await srv.tx().post(`/Contracts(ID=${ID},IsActiveEntity=true)/calculate`, {});
        });
    }
}