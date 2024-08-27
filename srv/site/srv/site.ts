import cds from "@sap/cds";
import { ApplicationService, Request, ResultSet } from "@sap/cds";
import type { Contract } from "#cds-models/SiteService";

export class SiteService extends ApplicationService {
    async init(): Promise<void> {
        const { Contracts } = await import('#cds-models/SiteService');

        this.before(['*'], '*', this.onBeforeAnything);

        this.before(['CREATE', 'UPDATE'], Contracts.name, this.onBeforeContractActicate);
        this.after(['CREATE', 'UPDATE'], Contracts.name, this.onAfterContractActicate);

        return super.init();
    }

    onBeforeAnything(req: cds.Request) {
        req;
    }

    onBeforeContractActicate(req: Request) {
        const fields2delete = this.entities.Contracts.elements
            .filter(x => {
                const obj = x as { [key: string]: any };
                return obj['@calculated'];
            }).map(x => x.name);

        if (req.query.UPDATE) {
            fields2delete.forEach(field2delete => delete req.query.UPDATE.data[field2delete]);
        } else if (req.query.INSERT) {
            req.query.INSERT.entries.forEach(entry =>
                fields2delete.forEach(field2delete => delete entry[field2delete])
            );
        }
    }

    async onAfterContractActicate(res: any, req: any): Promise<void> {
        const ID: Contract["ID"] = req.data.ID;

        req.on('succeeded', async () => {
            const srv = await cds.connect.to('ExternalCalculatorService');
            await srv.tx().post(`/Contracts(ID=${ID},IsActiveEntity=true)/calculate`, {});
        });
    }
}