import MortgageFormula from "@mortgagecalc/calculatorservice/srv/lib/MortgageFormula/MortgageFormula";
import type { Contract } from "@mortgagecalc/database/tables";

const contract: Contract = { 
    "ID": "48d52487-9610-461f-9cf7-9a9106b2990d", 
    "years": 10, 
    "amount": 61000, 
    "dateStart": "2024-01-28", 
    "dateFinish": "2034-02-15", 
    "baseInterestRate": 2.4, 
    "monthlyPaymentDate": 15
};

const euriborRate = 3.9;
const interestRate = 1.4;

const pv = 50000;
const years = 10;

const monthlyRate = (euriborRate + interestRate) / 12 / 100;
const nper = years * 12;

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