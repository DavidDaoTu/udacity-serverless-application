import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getAllTodos } from '../../businessLogic/todos.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('http-get-todos')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    // TODO: Get all TODO items for a current user
    logger.info("Processing event: ", event)
    //const todos = await getAllTodos()
    const todos = 0

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: todos
      })
    }
  })
