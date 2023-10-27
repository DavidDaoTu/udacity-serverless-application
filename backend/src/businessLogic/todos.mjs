import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todosAccess.mjs'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('businessLogic-todos')

const todoAccess = new TodoAccess()

export async function getAllTodos(userId) {
  console.log("businessLogic: get all todos of userId ", userId)
  return todoAccess.getAllTodos(userId)
}

export async function createTodo(createTodoRequest, userId) {
  /* todoId */
  const todoId = uuid.v4()
  /* createdAt */
  const createdAt = new Date().toISOString()

  return await todoAccess.createTodo({
    todoId: todoId,
    userId: userId,
    attachmentUrl: "",
    dueDate: createTodoRequest.dueDate,
    createdAt: createdAt,
    name: createTodoRequest.name,
    done: false
  })
}
