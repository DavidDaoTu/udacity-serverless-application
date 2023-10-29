# Project: Serverless TODO Application
The project is based on the given environment variables in the **./client/.env** file as below:

```sh
REACT_APP_AUTH0_DOMAIN=dev-oery5ndggggtcgox.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=Ud7HCLmUzcbkPamP6LdX9R8UApAIS8J5
REACT_APP_API_ENDPOINT=https://q59dcyvvgj.execute-api.us-east-1.amazonaws.com/dev
```
Please copy-paste the above variables to your ***./client/.env*** file

## I. Functionality

1. **The application allows users to create, update, delete TODO items**

   - CREATE TODO Item: 
     - We can see a **POST** request method to a "*REACT_APP_API_ENDPOINT/todos*" path.
     - Serverless backend' API returned a **HTTP 201 status code**.
     - Client frontend displays a new task
     
     <p align="center">
       <img src="Screenshots/CreateTask.png" width="100%" title="Create a new TODO task item" alt="CREATE TODO Item"/>
     </p>


   - UPDATE TODO Item:
     - We can see a **PATCH** request method to a *REACT_APP_API_ENDPOINT/todos/{todoId}*.
     - Serverless backend' API returns a **HTTP 200 status code**.
     - Client frontend shows a check in the box
     <p align="center">
       <img src="Screenshots/UpdateTask.png" width="100%" title="Update a given TODO task item" alt="UPDATE TODO Item"/>
     </p>


   - DELETE TODO Item:
     - We can see a **DELETE** request method to a *REACT_APP_API_ENDPOINT/todos/{todoId}*.
     - Serverless backend' API returns a **HTTP 200 status code**.
     - Client frontend doesn't show task#2 anymore
     <p align="center">
       <img src="Screenshots/DeleteTask.png" width="100%" title="Delete a given TODO task item" alt="DELETE TODO Item"/>
     </p>


2. **The application allows users to upload a file.**

   - We can see a **PUT** request method to a *Pre-signed URL*.
   - Serverless backend' API returns a **HTTP 200 status code**.
   - Client frontend also shows an image under task#3 item
   <p align="center">
    <img src="Screenshots/UploadFile.png" width="100%" title="Upload a file/attachment to the given TODO task item" alt="Upload file to a given TODO Item"/>
   </p>



3. **The application only displays TODO items for a logged in user.**
    > **Note:**   
    > Currently, I logged in with user name: "fakeemail1@gmail.com" as can be seen under "**Console**" of previous screenshot

    Now, I will log out & log in with another user: "fakeemail2@gmail.com" & show the differences between each user's todo items as the following:

    <p align="center">
    <img src="Screenshots/AnotherUser.png" width="100%" title="Log-in another user 2 account" alt="User 1 vs User 2"/>
    </p>



4. **Authentication is implemented and does not allow unauthenticated access.**

    - We can see a **GET** request method to a "*REACT_APP_API_ENDPOINT/todos*" path without Authentication, which results in an access denied
    - Serverless backend' API returns a **HTTP 401 status code**.
    - Postman shows a response message with "Unauthorized"
    <p align="center">
     <img src="Screenshots/UnauthorizedAccess.png" width="100%" title="Unauthorized user access" alt="Unauthorized user"/>
    </p>



## II. Code Base

1. The code is split into multiple layers separating business logic from I/O related code.


    - My backend source code is seperated with multiple layers as can be seen as the below:
      <p align="center">
      <img src="Screenshots/MultilayerSourceCode.png" width="100%" title="Multilayer source code of my project" alt="Multilayer source code of my project"/>
      </p>



2. Code is implemented using async/await and Promises without using callbacks.

  - My backend source code is implemented with using async/await & promises without using any callback:

    <p align="center">
     <img src="Screenshots/AsyncAwaitCode.png" width="100%" title="Async/await source code of my project" alt="Async/await source code of my project"/>
    </p>



## III. Best Practice

1. All resources in the application are defined in the "serverless.yml" file

  - My backend source code provides all AWS resources via "serverles.yml" file.

    <p align="center">
     <img src="Screenshots/ServerlessResources.png" width="100%" title="Provide AWS resources with serverless.yml" alt="serverless.yml source code of my project"/>
    </p>

2. Each function has its own set of permissions.

  - Each functions in serverless.yml has own proper sets of permission:
    <p align="center">
     <img src="Screenshots/FunctionPermissions.png" width="100%" title="Each function in serverless.yml has own permissions" alt="serverless.yml shows functions'permisisons"/>
    </p>


3. Application has sufficient monitoring.
  - Application logs are shown under CloudWatch's log groups with Winston's logs for troubleshooting
    <p align="center">
     <img src="Screenshots/CloudWatchLogs.png" width="100%" title="Application's logs in CloudWatch" alt="CloudWatch logs"/>
    </p>

4. HTTP requests are validated

  - In order to create-todo & update-todo, we used APIGateway's validator with the following schemas
    <p align="center">
     <img src="Screenshots/APIGatewayValidator.png" width="100%" title="APIGateway validator" alt="APIGateway validator"/>
    </p>



## IV. Architecture

1. Data is stored in a table with a composite key.
  - Data is stored in a DynamoDB table with a composite key as below:
    <p align="center">
     <img src="Screenshots/DynamoDBTable.png" width="100%" title="DynamoDB Table with Composite Key" alt="DynamoDB Table with Composite Key"/>
    </p>


2. Scan operation is not used to read data from a database.
  - I only use Query operation on DynamDB table:
    <p align="center">
     <img src="Screenshots/QueryDB.png" width="100%" title="Only use query onDynamoDB Table with partition key" alt="Only use query onDynamoDB Table with Partition Key"/>
    </p>



<====================> END-OF-PROJECT RUBRIC <====================>

# This section below is a personal note and NOT related to project rubric!!!!


## Implementation Notes 
### Backend's resources setup
- Go to the "backend" folder, run the following command to install node_modules:
    ```js
    $ npm install
    ```
- Configure the "serverless.yaml":


### Features implementation:
1. Authentication
   - Client side


   - Backend side


2. GetToDos
3. CreateTodo
4. UpdateTodo
   - UpdateItem: Plz refer to these links:
      - https://dynobase.dev/dynamodb-nodejs/#update-item
      - https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html
5. DeleteTodo
   - DeleteItem: Remember to add "cors: true" under function in serverless.yml
6. GenerateUploadURL