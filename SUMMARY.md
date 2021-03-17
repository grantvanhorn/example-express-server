### Implemented
1. The project is running a simple Babel ES6 setup.
2. ENV variables are used so the project can be configured for wherever it will live. This also allows us to turn certain things off and on depending on the ENV. For example I use this to not console log controller output during tests so the console is not cluttered.
3. Models were made using classes to make sure only the specified attributes are created when data is sent to the controller. This also mimics using an ORM for DB models.
4. Users and Posts controllers were implemented.
5. Post controller has support for CRUD.
6. The posts controller routes support logic for returning success, not found or bad data.
7. Unit tests were implemented to make sure model validation methods are always correct.
8. Integration tests were added to ensure our controllers are returning what we expect for both data and response codes.
9. The app loads the example models that were provided on startup for the sake of speeding up having data for this exercise and also to seed the tests.

### Next Steps
1. Adding an ORM would be next. I have used both sequelize and typeorm recently. I would go with typeorm. This would be with a postgres db.
2. Convert the plain ES6 model classes into typeorm classes.
3. Validation would be extended and implemented via the typeorm models. Things like string size limits, not null. Update the controllers to call the db instead of in memory solution we have now.
4. Authentication would be done with JWT and bcrypt. On incoming requests the Bearer token would be taken from the req header and injected into the route. Each controller/endpoint would be able to specify if its a protected route.
5. Logging would have process ids to tie individual log lines into the same request.
6. Wrap the application in a Docker container. Add a compose file as well to spin up the needed db in one call.
