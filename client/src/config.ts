
const apiId = 'q59dcyvvgj'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-oery5ndggggtcgox.us.auth0.com',    // Domain from Auth0
  clientId: 'Ud7HCLmUzcbkPamP6LdX9R8UApAIS8J5',  // Client id from an Auth0 application
  callbackUrl: 'http://localhost:3000/callback'
}