import cds from "@sap/cds";
import { ApplicationService, Request, ResultSet } from "@sap/cds";
import type { Contract } from "#cds-models/SiteService";

export class SiteService extends ApplicationService {
    async init(): Promise<void> {
        const { Contracts } = await import('#cds-models/SiteService');
        this.after(['CREATE', 'UPDATE'], Contracts, this.onAfterContractActicate);

        return super.init();
    }

    async onAfterContractActicate(res: Contract, req: any): Promise<void> {
        const ID: Contract["ID"] = req.data.ID;

        req.on('succeeded', async () => {
            const srv = await cds.connect.to('ExternalCalculatorService');
            await srv.post(`/Contracts(ID=${ID},IsActiveEntity=true)/calculate`, {});
        });
    }
}