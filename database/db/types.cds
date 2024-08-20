namespace mortgagecalc.db.types;

type Money: Decimal(13, 2);
type Percentages: Decimal(13, 3);

type CentralBankPeriod: String enum { weekly; monthly1; monthly3; monthly6; yearly }
