import cds from "@sap/cds";
import { ApplicationService, Request, ResultSet } from "@sap/cds";
import type { Contract, Contracts } from "#cds-models/SiteService";

export class SiteService extends ApplicationService {
    async init(): Promise<void> {
        const { Contracts } = await import('#cds-models/SiteService');

        this.before(['CREATE', 'UPDATE'], Contracts, this.onBeforeContractActicate)
        this.after(['CREATE', 'UPDATE'], Contracts, this.onAfterContractActicate);

        return super.init();
    }
    onBeforeReadContracts(req: cds.Request) {
        const requiredColumns = ['years', 'totalInterest', 'amount', 'baseInterestRate', 'baseCentralBankRate', 'dateStart', 'Currency_code'];
        requiredColumns.forEach(column => {
            if (!req.query.SELECT.columns.some(reqColumn => reqColumn.ref.at(0) === column)) {
                req.query.SELECT.columns.push({ ref: [column] })
            }
        }
        );
    }

    async onBeforeContractActicate(req: Request) {
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

    async onAfterContractActicate(res: Contract, req: any): Promise<void> {
        const ID: Contract["ID"] = req.data.ID;

        req.on('succeeded', async () => {
            const srv = await cds.connect.to('ExternalCalculatorService');
            await srv.post(`/Contracts(ID=${ID},IsActiveEntity=true)/calculate`, {});
        });
    }
}