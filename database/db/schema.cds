namespace mortgagecalc.db.tables;
using { cuid, managed, Currency } from '@sap/cds/common';
using { mortgagecalc.db.types as types } from './types';

@description : 'Head entity - planned contract to be calculated'
@odata.draft.enabled
entity Contracts: cuid, managed {
    years: Integer @assert.range: [ 1, 50 ];
    amount: types.Money;
    dateStart: Date;
    dateFinish: Date;
    baseInterestRate: types.Percentages default 0;
    baseCentralBankRate: types.Percentages default 0;
    monthlyPaymentDate: Integer @assert.range: [ 1, 28 ] default 1;
    Currency: Currency;
    ContractRates: Composition of many ContractRates on ContractRates.parent = $self;
    ContractPayments: Composition of many ContractPayments on ContractPayments.parent = $self;
    ContractExtraPayments: Composition of many ContractExtraPayments on ContractExtraPayments.parent = $self;
    
    @calculated numberOfPeriods: Integer = years * 12 stored;
    @calculated totalPayment: types.Money = -amount + totalInterest stored;
    @calculated contractTitle: String = concat(amount, concat(' ', concat(Currency.code, concat(', ', concat(baseInterestRate + baseCentralBankRate, ' %'))))) stored;
    @calculated contractDescription: String = concat('from ', dateStart) stored;

    totalInterest: types.Money default 0;
}

@description : `Contract rates (centralBank + interest rate) is not a static thing.
CentralBank part is recalculated every 6 months. Base rate can be adjusted by discounts or fees`
entity ContractRates: cuid {
    parent: Association to one Contracts;
    
    validFrom : Date @cds.valid.from;
    centralBankRate: types.Percentages;
    interestRate: types.Percentages;
}

@description : 'Expected contract payments. Both regular and extra.'
entity ContractPayments: cuid {
    parent: Association to one Contracts;

    paymentDate: Date;
    body: types.Money default 0;
    interest: types.Money default 0;
    required: Boolean default false;
    remainingDebt: types.Money;
    total: types.Money = interest + body stored;
}

@description : 'Expected extra contract payments.'
entity ContractExtraPayments as projection on ContractPayments where required = false;

@description: `Daily CentralBank values. Usually defined for workdays only. 
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