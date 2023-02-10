const cds = require('@sap/cds');
const setMailEntityFieldControl = require('./libs/setMailEntityFieldControl.js')
const resendSuccessMessage = 'Resending is successful. Refresh screen to update entry status'
const { executeHttpRequest } = require('@sap-cloud-sdk/core');


module.exports = async function (srv) {
    const { mailrequests, whitelists, attachments } = srv.entities;
    srv.on('READ', mailrequests, async (req) => {
        let query = '';
        if (req._path && req._path == 'mailrequests') {

            query = '/mailrequests?$count=true&$top=30';

            if (req._queryOptions.$filter) {
                query += `&$filter=${req._queryOptions.$filter}`
            }

            if (req._queryOptions.$skip && req._queryOptions.$skip > 0) {
                query += `&$skip=${req._queryOptions.$skip}`
            }
        } else {
            query = `/${req._path}`
        }

        let reqparams = {
            method: 'get',
            url: query
        }

        const destination = {
            destinationName: 'Mail_Service_MTX'
        }
        try {
            const result = await executeHttpRequest(destination, reqparams)
            var mailrequestlist = [];
            if (req._path && req._path == 'mailrequests') {
                mailrequestlist = result.data.value;
                var count = result.data["@odata.count"] ?? 0
                Object.assign(mailrequestlist, { $count: count });
            } else {
                mailrequestlist = result.data
            }
            return mailrequestlist;
        }
        catch (error) {
            if (error.response.data) {
                req.error({ "code": error.response.data.error.code, "message": error.response.data.error.message })
            } else {
                req.error({ "message": error.message });
            }
        }
    })

    srv.on('READ', 'attachments', async (req) => {
        var url = req._path;
        if (req.data.ID) {
        } else {
            url += `?$count=true`
            console.log("Test");
        }

        const destination = {
            destinationName: 'Mail_Service_MTX'
        }

        let reqparams = {
            method: 'get',
            url: url
        }

        try {
            const result = await executeHttpRequest(destination, reqparams)
            var attachmentlist = [];
            if (req.data.ID) {
                attachmentlist = result.data;
            } else {
                attachmentlist = result.data.value;
                var count = result.data["@odata.count"] ?? 0
                Object.assign(attachmentlist, { $count: count });
            }
            return attachmentlist;
        }
        catch (error) {
            if (error.response.data !== undefined) {
                req.error({ "code": error.response.data.error.code, "message": error.response.data.error.message })
            } else {
                req.error({ "message": error.message });
            }
        }
    })

    // //For failed mails -> Action sendmail
    srv.on('sendmail', async (req) => {
        const id = req.params[0];
        var payload = {
            "mailid": id
        }
        try {
            const result = await executeHttpRequest(
                {
                    destinationName: "Mail_Service_MTX"
                },
                {
                    method: 'POST',
                    data: payload,
                    url: "/sendmail"
                }
            )
            req.info(resendSuccessMessage)
        }
        catch (error) {
            if (error.response.data !== undefined) {
                req.error({ "code": error.response.data.error.code, "message": error.response.data.error.message })
            } else {
                req.error({ "message": error.message });
            }
        }
    })

    // After read -> Determine status and availability of sendmail action
    srv.after('READ', 'mailrequests', (result) => {
        console.log('[AFTER READ]')
        if (Array.isArray(result)) {
            for (let i of result.entries()) {
                setMailEntityFieldControl(i[1])
            }
        } else {
            setMailEntityFieldControl(result)
        }
    })

}