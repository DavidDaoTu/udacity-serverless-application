import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todosAccess.mjs'
import { getUploadUrl, getAttachmentUrl } from '../fileStorage/attachmentUtils.mjs'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('businessLogic-todos')

const todoAccess = new TodoAccess()

export async function getAllTodos(userId) {
  console.log("businessLogic: get all todos of userId ", userId)
  return todoAccess.getAllTodos(userId)
}

export async function createTodo(createTodoRequest, userId) {
  console.log("businessLogic: create a todo of userId ", userId)
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

export async function updateTodo(todoId, updateTodoRequest, userId) {
  console.log(`businessLogic: update a todoId ${todoId} of userId: `, userId)
  
  return await todoAccess.updateTodo({
    todoId,
    userId,    
    ...updateTodoRequest
  })
}


export async function deleteTodo(todoId, userId) {
  console.log(`businessLogic: delete a todoId ${todoId} of userId: `, userId)
  
  return await todoAccess.deleteTodo({
    todoId,
    userId
  })
}

export async function getTodoFileUploadUrl(todoId, userId) {
  console.log(`businessLogic: get uploadUrl for todoId ${todoId} of userId: `, userId)
  
  const fileId = uuid.v4()
  const uploadUrl = await getUploadUrl(fileId)
  console.log("businessLogic: uploadUrl = ", uploadUrl)

  /** Need to refactor later 
   * because having uploadUrl is not enough to gurantee have attachmentUrl
  */
  if (uploadUrl) {
    /* Updating attachmentUrl for todoId */
    console.log(`businessLogic: updating attachmentUrl for todoId ${todoId}`)
    const attachmentUrl = await todoAccess.updateTodoAttachmentUrl({
      userId,
      todoId,
      attachmentUrl: getAttachmentUrl(fileId)
    })

    console.log("attachmentUrl = ", attachmentUrl)
  }

  return uploadUrl
}

