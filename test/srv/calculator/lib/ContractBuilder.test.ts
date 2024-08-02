import ContractBuilder from "@mortgagecalc/calculatorservice/srv/lib/ContractBuilder";

describe('Test ContractBuilder and its mixins: MortgageFormulaMixin and ContractPersistanceProxyMixin', () => {
    test('adds 1 + 2 to equal 3', () => {
        const Contract = new ContractBuilder({});
        expect(3).toBe(3);
    });
});