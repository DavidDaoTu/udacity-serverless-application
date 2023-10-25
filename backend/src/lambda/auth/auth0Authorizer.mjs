import Axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
import { createLogger } from '../../utils/logger.mjs'

/* Hard-coded certificate from Auth0 */
const certificate = `-----BEGIN CERTIFICATE-----
MIIDHTCCAgWgAwIBAgIJHabJRMctfjnAMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNV
BAMTIWRldi12ODRncmFoeW9ueTh0dW90LnVzLmF1dGgwLmNvbTAeFw0yMzEwMjUy
MjMwMzdaFw0zNzA3MDMyMjMwMzdaMCwxKjAoBgNVBAMTIWRldi12ODRncmFoeW9u
eTh0dW90LnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBANcVp1LGF0TCv9YHRmGIm1JhEUt5GHaeHihVEotXDLrM0jdKWGpbltQJpt3Z
GVbAmeMtxEh1liBAlWjGby/rsc75I67QQcfGCdOiYj8nRU9whY0Q50Tcplf8dry2
VQfT2vQysAvQVuG+LRYQmBk1tDEI5lJojxx/zGabXLNeib1OlhQlU++0z/kyh+MK
jMxMEBT7ICqaWMASmhk4X2+IDpoSU0iUOTBj1CKZE95MaZQimxZ4wsIkxkNTcP2R
SmE/BHTZWY9xa+XdDuYXIrUvbr457XDkowDDXLSIzcog0FN02UbuqsBtZUV5Oqbg
1JdH0Px45LypmdL2H950TO8OhJ0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQUrWti4bHbdMfvcZQt6tccNPFbqKQwDgYDVR0PAQH/BAQDAgKEMA0G
CSqGSIb3DQEBCwUAA4IBAQDQeMwcVJRCNb+Uy5HQeWlDiihgnrqntaXfM6Re7HkH
CYacxEP0V0ummbaPjDI5YbNBAIYnMjk4Jw/r+ol9bxKfs9sHEun7HrkJ9IyRJZNQ
X15+zgZF44Ncz4FdsWaJKTtuUWGnGUqZr4fPlGTYg+D+TbS0v9ojfjCmHYJICOYp
moKeX+SBpmBGanwegO8/AKhj/3rN0x4J4bVn7JfN+ldiHbNiVQFSdZaIT5No/8jW
l0G3mRqTo02BsGpDRtnowFp8KrQQT4fCvq+od5U3N/honmkrj8uk85NCsBZmHVlA
qAJHXMhrAzOoWikV2LT1Dfm0yqXBmDmyQ1oYMSOfFTBE
-----END CERTIFICATE-----`

const logger = createLogger('auth')

const jwksUrl = 'https://test-endpoint.auth0.com/.well-known/jwks.json'

export async function handler(event) {
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info("User was authorized", {
      userId: jwtToken.sub
    });

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader) {
  const token = getToken(authHeader)
  const jwt = jsonwebtoken.decode(token, { complete: true })

  // TODO: Implement token verification
  jsonwebtoken.verify(token, certificate, {algorithms: ['RS256']})
  return jwt;
}

function getToken(authHeader) {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
