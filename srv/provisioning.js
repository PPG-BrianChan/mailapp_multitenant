const xsenv = require("@sap/xsenv")

module.exports = (service) => {

    service.on('UPDATE', 'tenant', async (req, next) => {
        await next() // default implementation creating HDI container
        console.log('**** MTX API: Subscription ****')
        console.log(JSON.stringify(req.data))
        let tenantURL = `https://${req.data.subscribedSubdomain}-s4btp-ca-mailapp-approuter.cfapps.eu10.hana.ondemand.com`
        console.log(`Subscriber tenant URL -< ${tenantURL}`)
        return tenantURL
    })

    service.on('dependencies', async (req) => {
        console.log('**** MTX API: dependencies ****')
        const services = xsenv.getServices({ 'portal': { tag: 'portal' } })
        const dependencies = [{ xsappname: services['portal'].uaa.xsappname }]
        return dependencies
    })

}