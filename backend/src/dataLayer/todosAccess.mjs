import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('dataLayer')

export class TodoAccess {
  constructor(
    documentClient = AWSXRay.captureAWSv3Client(new DynamoDB()),
    todosTable = process.env.TODOS_TABLE
  ) {
    this.documentClient = documentClient
    this.todosTable = todosTable
    this.dynamoDbClient = DynamoDBDocument.from(this.documentClient)
  }

  async getAllTodos(userId) {
    logger.info('Getting all todos')

    const result = await this.dynamoDbClient.query({
      TableName: this.todosTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      },
      ScanIndexForward: false      
    })
    console.log("todos result = ", result)
    return result.Items
  }

  async createTodo(todo) {
    logger.info(`Creating a todo with id ${todo.todoId}`)
    console.log("Storing a new todo: ", todo)

    await this.dynamoDbClient.put({
      TableName: this.todosTable,
      Item: todo
    })

    return todo
  }

  async updateTodo(updatedTodoItem) {
    // logger.info(`Updating a todo with id ${updatedTodoItem.todoId}`)
    console.log("todosAccess: Updating a updatedTodoItem: ", updatedTodoItem)

    const newUpdatedTodoItem = await this.dynamoDbClient
      .update({
        TableName: this.todosTable,
        Key: {
          'userId' : updatedTodoItem.userId,
          'todoId' : updatedTodoItem.todoId
        },

        UpdateExpression: 'set #task_name = :name, \
                              dueDate = :dueDate, \
                              done = :done',

        ConditionExpression: "(#task_name <> :name) or \
                              (dueDate <> :dueDate) or \
                              (done <> :done)",

        ExpressionAttributeValues: {     
          ':name'   : updatedTodoItem.name,
          ':dueDate': updatedTodoItem.dueDate,
          ':done'   : updatedTodoItem.done
        },

        ExpressionAttributeNames: {
          '#task_name': 'name'
        },

        ReturnValues: 'UPDATED_NEW'
      })

    return newUpdatedTodoItem
  }

  async deleteTodo(deletedTodo) {
    logger.info(`Deleting a todoId ${deletedTodo.todoId}`)
    console.log("Deleting a todo request: ", deletedTodo)

    const deletedItem = await this.dynamoDbClient.delete({
      TableName: this.todosTable,
      Key: {
        'userId' : deletedTodo.userId,
        'todoId' : deletedTodo.todoId
      },
      ReturnValues: 'ALL_OLD'
    })
    console.log("deletedItem: ", deletedItem)

    return deletedItem
  }

  async updateTodoAttachmentUrl(updatedTodoAttachment) {
    
    console.log("todosAccess: Updating a updatedTodoAttachment: ", updatedTodoAttachment)

    const newUpdatedTodoAttachmentUrl = await this.dynamoDbClient.update({
        TableName: this.todosTable,
        Key: {
          'userId' : updatedTodoAttachment.userId,
          'todoId' : updatedTodoAttachment.todoId
        },

        UpdateExpression: 'set attachmentUrl = :attachmentUrl',

        ExpressionAttributeValues: {     
          ':attachmentUrl'  : updatedTodoAttachment.attachmentUrl
        },

        ReturnValues: 'UPDATED_NEW'
      })

    return newUpdatedTodoAttachmentUrl
  }
}
