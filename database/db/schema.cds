namespace mortgagecalc.db.tables;

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