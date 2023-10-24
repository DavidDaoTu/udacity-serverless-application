# Project: Serverless TODO Application
The project is based on the following rubric:

## Functionality

1. The application allows users to create, update, delete TODO items





2. The application allows users to upload a file.





3. The application only displays TODO items for a logged in user.





4. Authentication is implemented and does not allow unauthenticated access.








## Code Base

1. The code is split into multiple layers separating business logic from I/O related code.






2. Code is implemented using async/await and Promises without using callbacks.







## Best Practice

1. All resources in the application are defined in the "serverless.yml" file



2. Each function has its own set of permissions.




3. Application has sufficient monitoring.





4. HTTP requests are validated








## Architecture

1. Data is stored in a table with a composite key.



2. Scan operation is not used to read data from a database.




<====================> END-OF-PROJECT RUBRIC <====================>

# This section below is a personal note and NOT related to project rubric!!!!


## Implementation Notes 
### Backend
- Go to the "backend" folder, run the following command to install node_modules:
    ```js
    $ npm install
    ```
- Configure the "serverless.yaml":
