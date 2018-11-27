const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const OAuthClient = require('intuit-oauth');
const fetch = require('isomorphic-unfetch')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


const oauthClient = new OAuthClient({
  clientId: 'Q0VQWNda83Yk48vusvSnhza6xHGSoMS7OLBwN0HZylufGgW5mg',  // enter the apps `clientId`
  clientSecret: 'S8glJ0BILp6ZwnafSSm6DOZ3Q0LDydxmruT4iUzW',  // enter the apps `clientSecret`
  environment: 'sandbox',     // enter either `sandbox` or `production`
  redirectUri: 'http://localhost:3000/oauth_callback', // enter the redirectUri
  logging: true   // by default the value is `false`
})

const authUri = oauthClient.authorizeUri({ scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId], state: 'testState' });

app.prepare()
  .then(() => {
    const server = express()

    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json())
    server.use(cookieParser())

    server.get('/authUri', (req, res) => {
      res.redirect(authUri)
    })

    server.get('/oauth_callback', function (req, res) {
      oauthClient.createToken(req.url)
      .then(function (authResponse) {
        const oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
        const realmId = oauthClient.getToken().realmId
        res.cookie('token', oauth2_token_json, { maxAge: 3600000 })
        res.cookie('companyId', realmId, { maxAge: 3600000 })
        res.redirect('/home');
      })
      .catch(function (e) {
        console.error(e);
      });
    });

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })