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
    baseInterestRate: types.Percentages;
    baseCentralBankRate: types.Percentages;
    monthlyPaymentDate: Integer @assert.range: [ 1, 28 ] default 1;
    Currency: Currency;
    ContractRates: Composition of many ContractRates on ContractRates.parent = $self;
    ContractPayments: Composition of many ContractPayments on ContractPayments.parent = $self;
    ContractExtraPayments: Composition of many ContractExtraPayments on ContractExtraPayments.parent = $self and ContractExtraPayments.required = false;
    
    @calculated numberOfPeriods: Integer = years * 12;
    @calculated totalPayment: types.Money = -amount + totalInterest;
    @calculated contractTitle: String = concat(amount, concat(' ', concat(Currency.code, concat(', ', concat(baseInterestRate + baseCentralBankRate, ' %')))));
    @calculated contractDescription: String = concat('from ', concat(dateStart));

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
    required: Boolean default true;
    remainingDebt: types.Money;
    total: types.Money = interest + body stored;
}

@description : 'Expected contract payments. Both regular and extra.'
entity ContractExtraPayments: cuid {
    parent: Association to one Contracts;

    paymentDate: Date;
    body: types.Money default 0;
    interest: types.Money default 0;
    required: Boolean default true;
    remainingDebt: types.Money;
    total: types.Money = interest + body stored;
}

@description: `Daily CentralBank values. Usually defined for workdays only. 
If holyday value is needed - previous workday's one can be taken`
@Capabilities: {
    InsertRestrictions.Insertable: true,
    UpdateRestrictions.Updatable: false,
    DeleteRestrictions.Deletable: false
}
entity CentralBankValues {
    key day: Date @required;
    weekly: Decimal (13, 3) @required;
    monthly1: Decimal (13, 3);
    monthly3: Decimal (13, 3);
    monthly6: Decimal (13, 3);
    yearly: Decimal (13, 3);
}