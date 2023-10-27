import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todosAccess.mjs'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('businessLogic-todos')

const todoAccess = new TodoAccess()

export async function getAllTodos(userId) {
  console.log("businessLogic: get all todos of userId ", userId)
  return todoAccess.getAllTodos(userId)
}

export async function createGroup(createGroupRequest, userId) {
  const itemId = uuid.v4()

  return await groupAccess.createGroup({
    id: itemId,
    userId: userId,
    name: createGroupRequest.name,
    description: createGroupRequest.description
  })
}
