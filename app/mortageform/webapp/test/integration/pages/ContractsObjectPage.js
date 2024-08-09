sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'mortgagecalc.mortageform',
            componentId: 'ContractsObjectPage',
            contextPath: '/Contracts'
        },
        CustomPageDefinitions
    );
});