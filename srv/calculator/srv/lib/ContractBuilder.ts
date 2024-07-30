import type { Contract } from '#cds-models/db/tables';
import MortgageFormulaMixin from './MortgageFormulaMixin/MortgageFormulaMixin';
import ContractPersistanceProxyMixin from './ContractPersistanceProxyMixin';

class ContractBuilderBase {

    initial: Contract;
    basicTimeSheetLayer: Contract;

    appliedDiscountsLayer: Contract;

    consideredExtraPaymentsLayer: Contract;

    constructor(contract: Contract) {
        this.initial = structuredClone(contract);
    }

    buildBasicTimeSheetLayer(contract: Contract) {
        const layer: Contract = structuredClone(contract);

        this.basicTimeSheetLayer = layer;
    }

    buildAppliedDiscountsLayer(contract: Contract) {
        const layer: Contract = structuredClone(contract);

        this.appliedDiscountsLayer = layer;
    }

    buildConsideredExtraPaymentsLayer(contract: Contract) {
        const layer: Contract = structuredClone(contract);

        this.consideredExtraPaymentsLayer = layer;
    };
}

const ContractBuilder = MortgageFormulaMixin(ContractPersistanceProxyMixin(ContractBuilderBase));
export default ContractBuilder;