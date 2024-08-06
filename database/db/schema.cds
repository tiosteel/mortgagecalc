namespace mortgagecalc.db.tables;
using { cuid, temporal } from '@sap/cds/common';
using { mortgagecalc.db.types as types } from './types';

@description : 'Head entity - planned contract to be calculated'
entity Contracts: cuid {
    years: Integer @assert.range: [ 1, 50 ];
    amount: types.Money;
    dateStart: Date;
    dateFinish: Date;
    baseInterestRate: types.Percentages;
    monthlyPaymentDate: Integer @assert.range: [ 1, 28 ];
    ContractRates: Composition of many ContractRates;
    ContractBills: Composition of many ContractBills;
    ContractExtraPayments: Composition of many ContractPayments;
}

@description : `Contract rates (euribor + interest rate) is not a static thing.
Euribor part is recalculated every 6 months. Base rate can be adjusted by discounts or fees`
entity ContractRates: cuid, temporal {
    parent: Association to one Contracts;
    euriborRate: types.Percentages;
    interestRate: types.Percentages;
}

@description : `Expected regular payment bills. 
Should be recalculated after any change in ContractRates or any add in ContractPayments`
entity ContractBills: cuid {
    parent: Association to one Contracts;
    paymentDate: Date;
    interestValue: types.Money
}

@description : 'Expected contract payments. Both regular and extra.'
entity ContractPayments: cuid {
    paymentDate: Date;
    parent: Association to one Contracts;
    body: types.Money;
    interest: types.Money;
    total: types.Money
}

@description: `Daily Euribor values. Usually defined for workdays only. 
If holyday value is needed - previous workday's one can be taken`
@Capabilities: {
    InsertRestrictions.Insertable: true,
    UpdateRestrictions.Updatable: false,
    DeleteRestrictions.Deletable: false
}
entity EuriborValues {
    key day: Date @required;
    weekly: Decimal (13, 3) @required;
    monthly1: Decimal (13, 3);
    monthly3: Decimal (13, 3);
    monthly6: Decimal (13, 3);
    yearly: Decimal (13, 3);
}