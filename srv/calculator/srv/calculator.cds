using { mortgagecalc.db.tables as tables } from '@mortgagecalc/database';
using { mortgagecalc.db.types as types } from '@mortgagecalc/database';

@path: '/mortgage/calculator'
service CalculatorService {
    function getEuribor(day: Date, period: types.euriborPeriod) returns Decimal;
}