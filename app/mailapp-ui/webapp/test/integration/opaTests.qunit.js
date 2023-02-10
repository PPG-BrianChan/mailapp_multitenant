sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'MailApp/mailappui/test/integration/FirstJourney',
		'MailApp/mailappui/test/integration/pages/mailrequestsList',
		'MailApp/mailappui/test/integration/pages/mailrequestsObjectPage'
    ],
    function(JourneyRunner, opaJourney, mailrequestsList, mailrequestsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('MailApp/mailappui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThemailrequestsList: mailrequestsList,
					onThemailrequestsObjectPage: mailrequestsObjectPage
                }
            },
            opaJourney.run
        );
    }
);