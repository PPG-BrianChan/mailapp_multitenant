using mailapp as ma from '../db/data-model';

service ma_uiService {//@(requires : 'EmailUIAdmin') {
    entity mailrequests as projection on ma.mailrequests

                                                        // action -> POST, parameter in application/json
                                                        // function -> GET, parameter in URL
                                                        // bound -> with keys
                                                        // unbound -> general

                        actions {
        action sendmail();
    }

    entity attachments  as projection on ma.Attachments
    entity whitelists   as projection on ma.whitelists;

}