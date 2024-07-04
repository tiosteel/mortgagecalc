using { cuid, temporal } from '@sap/cds/common';

namespace mortgagecalc.db.tables;

@Capabilities: {
    InsertRestrictions.Insertable: true,
    UpdateRestrictions.Updatable: false,
    DeleteRestrictions.Deletable: false
}
entity EuriborValues: cuid {
    day: Date @required;
    weekly: Decimal @required;
    monthly1: Decimal;
    monthly3: Decimal;
    monthly6: Decimal;
    yearly: Decimal;
}