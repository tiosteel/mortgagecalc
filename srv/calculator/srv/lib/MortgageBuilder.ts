import type { Contract } from '#cds-models/db/tables';

class MortgageBuilder {

    #contract: Contract;
    #contractWithBasicTimeSheet: Contract;

    constructor(contract: Contract) {
        this.#contract = structuredClone(contract);
    }

    calculateBasicTimesheet() {
        this.#contractWithBasicTimeSheet = structuredClone(this.#contract);

    }
}