using { mortgagecalc.db.tables as tables } from '@mortgagecalc/database';
using { mortgagecalc.db.types as types } from '@mortgagecalc/database';

@path: '/mortgage/calculator'
service CalculatorService {
    function getEuribor(day: Date, period: types.CentralBankPeriod) returns Decimal;

    entity Contracts as projection on tables.Contracts actions {
        action calculate() returns Contracts;
    }; 
}