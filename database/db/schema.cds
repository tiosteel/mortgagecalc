namespace mortgagecalc.db.tables;
using { cuid, temporal, sap.common.CodeList as CodeList } from '@sap/cds/common';

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

entity ContractStatuses: CodeList {
    key code: String(15);
};

entity Contracts: cuid {
    years: Integer @assert.range: [ 1, 50 ];
    amount: Date;
    dateStart: Date;
    dateFinish: Date;
    baseInterestRate: Decimal(13, 3);
    monthlyPaymentDate: Integer @assert.range: [ 1, 28 ];
    ContractRates: Composition of many ContractRates;
    ContractBills: Composition of many ContractBills;
    ContractPayments: Composition of many ContractPayments;
    Status: Association to one ContractStatuses;
}

entity ContractRates: cuid, temporal {
    parent: Association to one Contracts;
    euriborRate: Decimal(13, 3);
    interestRate: Decimal(13, 3);
}

entity ContractBills: cuid {
    parent: Association to one Contracts;
    paymentDate: Date;
}

entity ContractPayments: cuid {
    parent: Association to one Contracts;
    body: Decimal(13, 3);
    interest: Decimal(13, 3);
}