using SiteService as service from './site';

annotate service.Contracts with @(
    UI.HeaderInfo: {
        TypeName : '{i18n>contractHeader}',
        TypeNamePlural: '{i18n>contractHeaderPlural}',
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
            Label: '{i18n>contractsYearsLabel}',
            Value: years
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractsAmountLabel}',
            Value: amount
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractsDateStartLabel}',
            Value: dateStart
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractsDateFinishLabel}',
            Value: dateFinish
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractsBaseInterestLabel}',
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
            Label: '{i18n>contractRatesValidFromLabel}',
            Value: ContractRates.validFrom
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractRatesCentralBankRateLabel}',
            Value: ContractRates.centralBankRate
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractRatesInterestRateLabel}',
            Value: ContractRates.interestRate
        }
    ],
    UI.FieldGroup #Contract   : {
        $Type: 'UI.FieldGroupType',
        Data : [ 
            {
                $Type: 'UI.DataField',
                Label: '{i18n>contractsAmountLabel}',
                Value: amount
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>contractsCurrencyLabel}',
                Value: Currency_code
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>contractsYearsLabel}',
                Value: years
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>contractsBaseInterestLabel}',
                Value: baseInterestRate
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>contractsBaseCentralBankRateLabel}',
                Value: baseCentralBankRate
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>contractsTotalPaymentLabel}',
                Value: totalPayment
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>contractsTotalInterestLabel}',
                Value: totalInterest
            }
        ]
    },
    UI.Facets                 : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>contractInfoLabel}',
            Target: '@UI.FieldGroup#Contract'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ContractPaymentsFacet',
            Label : '{i18n>contractPaymentsLabel}',
            Target: 'ContractPayments/@UI.PresentationVariant',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ContractExtraPaymentsFacet',
            Label : '{i18n>contractExtraPaymentsLabel}',
            Target: 'ContractExtraPayments/@UI.PresentationVariant',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>contractRatesLabel}',
            Target: 'ContractRates/@UI.PresentationVariant',
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
            Label: '{i18n>contractPaymentsPaymentDateLabel}',
            Value: paymentDate
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractPaymentsBodyLabel}',
            Value: body
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractPaymentsInterestLabel}',
            Value: interest
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractPaymentsRequiredLabel}',
            Value: required
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractPaymentsRemainingDebtLabel}',
            Value: remainingDebt
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractPaymentsTotalLabel}',
            Value: total
        }
    ],
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
        MaxItems: 100
    },
});

annotate service.ContractPayments with {
    required @readonly;
};

annotate service.ContractExtraPayments with @(UI: {
    LineItem           : [
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractPaymentsBodyLabel}',
            Value: body
        }
    ],
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
        MaxItems: 100
    },
});

annotate service.ContractExtraPayments with {
    required @readonly;
};

annotate service.ContractRates with @(UI: {
    LineItem           : [
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractRatesValidFromLabel}',
            Value: validFrom
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractRatesCentralBankRateLabel}',
            Value: centralBankRate
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>contractRatesInterestRateLabel}',
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

