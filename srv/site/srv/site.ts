import cds from "@sap/cds";
import { ApplicationService, Request } from "@sap/cds";
import type { Contract } from "#cds-models/SiteService";

export class SiteService extends ApplicationService {
    async init(): Promise<void> {
        const { Contracts } = await import('#cds-models/SiteService');
        this.on(['CREATE', 'UPDATE'], Contracts, this.onContractActicate);

        return super.init();
    }

    async onContractActicate(req: Request, next: (req: Request) => Promise<Contract> | any | void): Promise<void> {
        await next(req);

        await cds.tx(req).commit();

        const ID: Contract["ID"] = req.data.ID;

        const srv = await cds.connect.to('CalculatorService');
        await srv.send('POST', `/Contracts(ID=${ID},IsActiveEntity=true)/calculate`);
    }
}