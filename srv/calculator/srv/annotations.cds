using CalculatorService as service from './calculator';
annotate service.Contracts with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'years',
            Value : years
        },
        {
            $Type : 'UI.DataField',
            Label : 'amount',
            Value : amount,
        },
        {
            $Type : 'UI.DataField',
            Label : 'dateStart',
            Value : dateStart,
        },
        {
            $Type : 'UI.DataField',
            Label : 'dateFinish',
            Value : dateFinish,
        },
        {
            $Type : 'UI.DataField',
            Label : 'baseInterestRate',
            Value : baseInterestRate,
        },
    ]
);

