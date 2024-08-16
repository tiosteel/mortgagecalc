namespace mortgagecalc.db.tables;
using { cuid } from '@sap/cds/common';
using { mortgagecalc.db.types as types } from './types';

@description : 'Head entity - planned contract to be calculated'
@odata.draft.enabled
entity Contracts: cuid {
    years: Integer @assert.range: [ 1, 50 ];
    amount: types.Money;
    dateStart: Date;
    dateFinish: Date;
    baseInterestRate: types.Percentages;
    baseEuriborRate: types.Percentages;
    monthlyPaymentDate: Integer @assert.range: [ 1, 28 ] default 1;
    ContractRates: Composition of many ContractRates on ContractRates.parent = $self;
    ContractPayments: Composition of many ContractPayments on ContractPayments.parent = $self;

    @calculated numberOfPeriods: Integer = years * 12;
    @calculated totalPayment: types.Money = -amount + totalInterest;

    totalInterest: types.Money default 0;
}

@description : `Contract rates (euribor + interest rate) is not a static thing.
Euribor part is recalculated every 6 months. Base rate can be adjusted by discounts or fees`
entity ContractRates: cuid {
    parent: Association to one Contracts;
    
    validFrom : Timestamp @cds.valid.from;
    euriborRate: types.Percentages;
    interestRate: types.Percentages;
}

@description : 'Expected contract payments. Both regular and extra.'
entity ContractPayments: cuid {
    parent: Association to one Contracts;

    paymentDate: Date;
    body: types.Money default 0;
    interest: types.Money default 0;
    required: Boolean default true;
    remainingDebt: types.Money;
    total: types.Money = interest + body stored;
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