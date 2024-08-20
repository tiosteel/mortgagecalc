using SiteService as service from './site';

annotate service.Contracts with @(
    UI.HeaderInfo: {
        TypeName : 'Contract',
        TypeNamePlural: 'Contracts',
        Title : {
            $Type : 'UI.DataField',
            Value: contractTitle
        },
        Description: {
            $Type: 'UI.DataField',
            Value: contractDescription
        }
    },
    UI.LineItem               : [
        {
            $Type: 'UI.DataField',
            Label: 'years',
            Value: years
        },
        {
            $Type: 'UI.DataField',
            Label: 'amount',
            Value: amount
        },
        {
            $Type: 'UI.DataField',
            Label: 'dateStart',
            Value: dateStart
        },
        {
            $Type: 'UI.DataField',
            Label: 'dateFinish',
            Value: dateFinish
        },
        {
            $Type: 'UI.DataField',
            Label: 'baseInterestRate',
            Value: baseInterestRate
        }
    ],
    UI.PresentationVariant    : {
        $Type         : 'UI.PresentationVariantType',
        SortOrder     : [{
            Property  : dateStart,
            Descending: true,
        }],
        Visualizations: ['@UI.LineItem'],
    },
    UI.LineItem #ContractRates: [
        {
            $Type: 'UI.DataField',
            Label: 'validFrom',
            Value: ContractRates.validFrom
        },
        {
            $Type: 'UI.DataField',
            Label: 'centralBankRate',
            Value: ContractRates.centralBankRate
        },
        {
            $Type: 'UI.DataField',
            Label: 'interestRate',
            Value: ContractRates.interestRate
        }
    ],
    UI.FieldGroup #Contract   : {
        $Type: 'UI.FieldGroupType',
        Data : [ 
            {
                $Type: 'UI.DataField',
                Label: 'amount',
                Value: amount
            },
            {
                $Type: 'UI.DataField',
                Label: 'currency',
                Value: Currency_code
            },
            {
                $Type: 'UI.DataField',
                Label: 'years',
                Value: years
            },
            {
                $Type: 'UI.DataField',
                Label: 'dateStart',
                Value: dateStart

            },
            {
                $Type: 'UI.DataField',
                Label: 'baseInterestRate',
                Value: baseInterestRate
            },
            {
                $Type: 'UI.DataField',
                Label: 'baseCentralBankRate',
                Value: baseCentralBankRate
            },
            {
                $Type: 'UI.DataField',
                Label: 'totalPayment',
                Value: totalPayment
            },
            {
                $Type: 'UI.DataField',
                Label: 'totalInterest',
                Value: totalInterest
            }
        ]
    },
    UI.Facets                 : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Contract Info',
            Target: '@UI.FieldGroup#Contract'
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Contract Payments',
            Target: 'ContractPayments/@UI.PresentationVariant'
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Contract Rates',
            Target: 'ContractRates/@UI.PresentationVariant'
        }
    ]
);

annotate service.Contracts with {
    baseCentralBankRate @readonly;
    totalInterest   @readonly;
};

annotate service.ContractPayments with @(UI: {
    LineItem           : [
        {
            $Type: 'UI.DataField',
            Label: 'paymentDate',
            Value: paymentDate
        },
        {
            $Type: 'UI.DataField',
            Label: 'body',
            Value: body
        },
        {
            $Type: 'UI.DataField',
            Label: 'interest',
            Value: interest
        },
        {
            $Type: 'UI.DataField',
            Label: 'required',
            Value: required
        },
        {
            $Type: 'UI.DataField',
            Label: 'remainingDebt',
            Value: remainingDebt
        },
        {
            $Type: 'UI.DataField',
            Label: 'total',
            Value: total
        }
    ],
    SelectionPresentationVariant  : {
        $Type : 'UI.SelectionPresentationVariantType',
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            
        },
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            
        },
    },
    PresentationVariant: {
        $Type         : 'UI.PresentationVariantType',
        SortOrder     : [
            {
                Property  : paymentDate,
                Descending: false,
            },
            {
                Property  : required,
                Descending: true,
            }
        ],
        Visualizations: ['@UI.LineItem'],
    },
});

annotate service.ContractPayments with {
    required @readonly;
};

annotate service.ContractRates with @(UI: {
    LineItem           : [
        {
            $Type: 'UI.DataField',
            Label: 'validFrom',
            Value: validFrom
        },
        {
            $Type: 'UI.DataField',
            Label: 'centralBankRate',
            Value: centralBankRate
        },
        {
            $Type: 'UI.DataField',
            Label: 'interestRate',
            Value: interestRate
        }
    ],
    PresentationVariant: {
        $Type         : 'UI.PresentationVariantType',
        SortOrder     : [{
            Property  : validFrom,
            Descending: false,
        }],
        Visualizations: ['@UI.LineItem'],
    },
});
