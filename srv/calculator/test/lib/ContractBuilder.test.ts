import ContractBuilder from "@mortgagecalc/calculatorservice/srv/lib/ContractBuilder/ContractBuilder";
import MortgageFormula from "@mortgagecalc/calculatorservice/srv/lib/MortgageFormula/MortgageFormula";
import ContractPersistanceProxy from "@mortgagecalc/calculatorservice/srv/lib/ContractPersistanceProxy";
import type { Contract } from "@mortgagecalc/database/tables";

const contract: Contract = { 
    "ID": "48d52487-9610-461f-9cf7-9a9106b2990d", 
    "years": 10, 
    "amount": 61000, 
    "dateStart": "2024-01-28", 
    "dateFinish": "2034-02-15", 
    "baseInterestRate": 2.4, 
    "monthlyPaymentDate": 15,
    ContractPayments: []
};

describe('Test ContractBuilder', () => {
    test('test buildBasicTimeSheetLayer', () => {
        const contractBuilder = new ContractBuilder(contract, MortgageFormula, ContractPersistanceProxy);
        contractBuilder.buildPreCleansedContract();
        expect(contractBuilder.cleansedContractLayer).toMatchObject(contractBuilder.initial);
    });
});