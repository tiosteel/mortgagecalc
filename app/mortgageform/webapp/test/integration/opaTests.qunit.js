sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'mortgagecalc/mortgageform/test/integration/FirstJourney',
		'mortgagecalc/mortgageform/test/integration/pages/ContractsList',
		'mortgagecalc/mortgageform/test/integration/pages/ContractsObjectPage',
		'mortgagecalc/mortgageform/test/integration/pages/ContractPaymentsObjectPage'
    ],
    function(JourneyRunner, opaJourney, ContractsList, ContractsObjectPage, ContractPaymentsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('mortgagecalc/mortgageform') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheContractsList: ContractsList,
					onTheContractsObjectPage: ContractsObjectPage,
					onTheContractPaymentsObjectPage: ContractPaymentsObjectPage
                }
            },
            opaJourney.run
        );
    }
);