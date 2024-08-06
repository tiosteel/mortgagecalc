
import type { Contract } from '#cds-models/db/tables';
import type { PersistanceProxy } from './types';
class ContractPersistanceProxy implements PersistanceProxy {
    async save(contract: Contract) {
        return false;
    }
}


export default new ContractPersistanceProxy();