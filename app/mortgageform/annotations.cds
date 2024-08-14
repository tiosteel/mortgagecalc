using CalculatorService as service from '../../srv/calculator/srv/calculator';
annotate service.Contracts with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'years',
                Value : years,
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
            {
                $Type : 'UI.DataField',
                Label : 'baseEuriborRate',
                Value : baseEuriborRate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'monthlyPaymentDate',
                Value : monthlyPaymentDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'numberOfPeriods',
                Value : numberOfPeriods,
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalInterest',
                Value : totalInterest,
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalPayment',
                Value : totalPayment,
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalOverpayPercentage',
                Value : totalOverpayPercentage,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'years',
            Value : years,
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
    ],
);

