using SiteService as service from './site';
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
            Value : amount
        },
        {
            $Type : 'UI.DataField',
            Label : 'dateStart',
            Value : dateStart
        },
        {
            $Type : 'UI.DataField',
            Label : 'dateFinish',
            Value : dateFinish
        },
        {
            $Type : 'UI.DataField',
            Label : 'baseInterestRate',
            Value : baseInterestRate
        }
    ],
    UI.LineItem #ContractPayments : [
        {
            $Type : 'UI.DataField',
            Label : 'paymentDate',
            Value : ContractPayments.paymentDate
        },
        {
            $Type : 'UI.DataField',
            Label : 'body',
            Value : ContractPayments.body
        },
        {
            $Type : 'UI.DataField',
            Label : 'interest',
            Value : ContractPayments.interest
        },
        {
            $Type : 'UI.DataField',
            Label : 'required',
            Value : ContractPayments.required
        },
        {
            $Type : 'UI.DataField',
            Label : 'remainingDebt',
            Value : ContractPayments.remainingDebt
        },
        {
            $Type : 'UI.DataField',
            Label : 'total',
            Value : ContractPayments.total
        }
    ],
    UI.LineItem #ContractRates : [
        {
            $Type : 'UI.DataField',
            Label : 'validFrom',
            Value : ContractRates.validFrom
        },
        {
            $Type : 'UI.DataField',
            Label : 'euriborRate',
            Value : ContractRates.euriborRate
        },
        {
            $Type : 'UI.DataField',
            Label : 'interestRate',
            Value : ContractRates.interestRate
        }        
    ],
    UI.FieldGroup #Contract: {
        $Type : 'UI.FieldGroupType',
        Data: [
            {
                $Type : 'UI.DataField',
                Label : 'years',
                Value : years
            },
            {
                $Type : 'UI.DataField',
                Label : 'amount',
                Value : amount
            },
            {
                $Type : 'UI.DataField',
                Label : 'dateStart',
                Value : dateStart
                
            },
            {
                $Type : 'UI.DataField',
                Label : 'baseInterestRate',
                Value : baseInterestRate
            },
            {
                $Type : 'UI.DataField',
                Label : 'baseEuriborRate',
                Value : baseEuriborRate
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalPayment',
                Value : totalPayment
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalInterest',
                Value : totalInterest
            }
        ]
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Contract Info',
            Target : '@UI.FieldGroup#Contract'
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Contract Payments',
            Target : '@UI.LineItem#ContractPayments'
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Contract Rates',
            Target : '@UI.LineItem#ContractRates'
        }
    ]
);
annotate service.Contracts with {
    baseEuriborRate @readonly;
    totalInterest @readonly;
}
