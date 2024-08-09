sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'mortgagecalc/mortageform/test/integration/FirstJourney',
		'mortgagecalc/mortageform/test/integration/pages/ContractsList',
		'mortgagecalc/mortageform/test/integration/pages/ContractsObjectPage'
    ],
    function(JourneyRunner, opaJourney, ContractsList, ContractsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('mortgagecalc/mortageform') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheContractsList: ContractsList,
					onTheContractsObjectPage: ContractsObjectPage
                }
            },
            opaJourney.run
        );
    }
);