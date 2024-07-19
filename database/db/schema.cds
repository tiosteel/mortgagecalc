namespace mortgagecalc.db.tables;

@Capabilities: {
    InsertRestrictions.Insertable: true,
    UpdateRestrictions.Updatable: false,
    DeleteRestrictions.Deletable: false
}
entity EuriborValues {
    key day: Date @required;
    weekly: Decimal @required;
    monthly1: Decimal;
    monthly3: Decimal;
    monthly6: Decimal;
    yearly: Decimal;
}