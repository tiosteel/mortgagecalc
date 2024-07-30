
import type { WithBaseContract } from "./types";
import type { Contract } from '#cds-models/db/tables';

// https://www.typescriptlang.org/docs/handbook/mixins.html

export default function ContractPersistanceProxyMixin<TBase extends WithBaseContract>(Base: TBase) {
    return class ContractPersistanceProxy extends Base {
        async saveContract(contract: Contract) {

        }
    }
}