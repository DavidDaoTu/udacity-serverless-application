import Axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
import { createLogger } from '../../utils/logger.mjs'

/* Hard-coded certificate from Auth0 */
const certificate = `-----BEGIN CERTIFICATE-----
MIIDHTCCAgWgAwIBAgIJTQ5HATodD0QPMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNV
BAMTIWRldi1vZXJ5NW5kZ2dnZ3RjZ294LnVzLmF1dGgwLmNvbTAeFw0yMzEwMTcy
MzA2NTVaFw0zNzA2MjUyMzA2NTVaMCwxKjAoBgNVBAMTIWRldi1vZXJ5NW5kZ2dn
Z3RjZ294LnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBAKp0oBrHlzqjBA8IWSK/QjesK1d+6L2wZ/E12qiNyWF/PG2EECwJEXullm3X
9OvdHmEAgyDNAAWyu/oTMtf4n4dTcRqnvBF45vybd/ZcWMCJHRXtfUqMXHmspiM5
Pv63U0h81fUY/s7lDpykMclAXrS+d3MkPVtkA0HMdiGvPqZD5efpPyOg7O1Ma6dj
wEKpGpSmSLvEE5kLLZ4EEDNGk3Xd/8qDiyBeQ01gHI7j25g8YNxKoBKvg9rS0QHl
SCDPQgnGYa6NQ6w+P0q1dBGKT1jBJg+9ynH91lwmDbc5bJOKYpkCxLzvKWDIaXES
XJz1RpLjX77QIEd8l9vnqsLCC/MCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQUhvX26rZhP0a7cIcDGjz5IK+HJGowDgYDVR0PAQH/BAQDAgKEMA0G
CSqGSIb3DQEBCwUAA4IBAQBF3iAtSKP49b03AF4za8aQFTKZDjpYZemDJY0LaxkG
d9itP/4ynVa3kasj8EiE+Tph9C897ytWAyHH861kFbOYTAR1PEOG8vY5Cpx48uJX
asaP1/a+AFMRjSYHEFqgXv+4QJeTl8JVMS8ELPGj+rY1DJ31xNi9G96yXW32HyRt
6nZD/T63dm+WJ+lRQMiaLH0Ze/xgrVWfnskpwIu4XoWX671w+VQ0shtPwhi7pbHU
fS1QQNOx7V/s82LZkYYX0TzYm8kaDRVOplzHa6lFUsULDTWJhLoHBtutyXBA1hUN
6WqmXsbJ63uSN6DIzpd7k7d0GM7leVOr1SvqZILsD2Ft
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
