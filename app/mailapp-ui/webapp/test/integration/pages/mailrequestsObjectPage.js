sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'MailApp.mailappui',
            componentId: 'mailrequestsObjectPage',
            entitySet: 'mailrequests'
        },
        CustomPageDefinitions
    );
});