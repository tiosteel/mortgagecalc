import MortgageFormula from "@mortgagecalc/calculatorservice/srv/lib/MortgageFormula/MortgageFormula";

const centralBankRate = 3.9;
const interestRate = 1.4;

const pv = 50000;
const years = 10;

const monthlyRate = (centralBankRate + interestRate) / 12 / 100;
const nper = years * 12;

/**
 * @description see the excel confirmation in test/srv/calculator/lib/MortgageFormula/MortgageFormulaCases.xlsx
 */

describe('Test Mortgage formula', () => {
    test('test PMT 3 parameters', () => {
        const result = MortgageFormula.PMT(monthlyRate, nper, pv);
        expect(result).toBeCloseTo(-537.69, 2);
    });

    test('test IPMT 3 parameters', () => {
        const result = MortgageFormula.IPMT(monthlyRate, 119, nper, pv);
        expect(result).toBeCloseTo(-4.72, 2);
    });

    test('test PPMT 3 parameters', () => {
        const result = MortgageFormula.PPMT(monthlyRate, 118, nper, pv);
        expect(result).toBeCloseTo(-530.63, 2);
    });
});