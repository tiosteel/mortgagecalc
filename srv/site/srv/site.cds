using { mortgagecalc.db.tables as tables } from '@mortgagecalc/database';
using { mortgagecalc.db.types as types } from '@mortgagecalc/database';

@path: '/mortgage/site'
service SiteService {
    function getEuribor(day: Date, period: types.EuriborPeriod) returns Decimal;

    entity Contracts as projection on tables.Contracts;
}