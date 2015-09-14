# fropcorn
Nodejs Application to Post user data to mongo db and upload the errorDocs to Parse

This application exposes certain API endpoints to access the data stored and to upload the Parse.

API's
1. /{GET} - This returns the list of all the movies stored in the database.
2. /content {POST} - This adds a new movieName into the database.
3. /parse {GET} - This uploads the errorLogs collection data from server to the Parse.com Colection.

