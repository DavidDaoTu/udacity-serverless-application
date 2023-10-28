import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { deleteTodo } from '../../businessLogic/todos.mjs'
import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from '../utils.mjs'

const logger = createLogger('http-delete-todos')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )  
  .handler(async event =>  {
    const todoId = event.pathParameters.todoId

    // TODO: Remove a TODO item by id
    /* Get userId */
    const userId = getUserId(event)
    const deletedItem = await deleteTodo(todoId, userId)
    console.log("deletedItem = ", deletedItem)

    return {
      statusCode: 200      
    }
})

