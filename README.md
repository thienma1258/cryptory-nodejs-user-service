## Assignment

Welcome to the Cryptory backend assignment! We tried to give you an interesting and brief challenge to show of your skills. We have tried to constrain the assignment to a few hours, in case it takes you longer than that, feel free to submit a partial assignment. Thank you for taking the time to work on this, we're looking forward to the result.

In case you have any issues or feedback, feel free to reach out to our recruiter!

## Requirements

### Create a paginated result endpoint

We have supplied this project with a SQLite database file (data.db). Within the database you will find a table called _user_, a table called _image_, and a table called _attribute_user_ (association table). Create an endpoint `/users` where the user can `GET` a paginated result that returns a list of all the users with their relevant images and attributes. The parameters to this endpoint should be `offset` and `limit` (e.g. `/users?offset=20&limit=20`). We expect the returned data to look like this:

```
data: [
  {
   first_name: "xxx",
   ...
   media: [{name: "xxx", ...}, ...],
   attributes: [{name: "xxx"}, ...]
  },
  {
   first_name: "yyy",
   ...
   media: [{name: "xxx", ...}, ...],
   attributes: [{name: "xxx"}, ...]
  },
  ...
],
pagination: {
  total_user: <total number of users in db>,
  total_pages: <total_users / limit>
  offset: <current offset>,
  limit: <current limit>
}
```

_NOTE: Please sort the media by the created (it's a timestamp) column, newest first_

### Allow us to create a new user

Create an endpoint that allows us to insert a new user into the database. Please properly validate all the input. Failed validation should be returned with a helpful indication of what failed. After a successful creation the user object should be returned (as JSON) with a 200 status code.

_NOTE: The user should be at least 18 years old_

## Please do

-   Use modules from the Deno community to reduce your workload and show off your selection criteria
-   Keep a balance between using external modules and showing off your skills!
-   Adjust the code structure and layout to your preference to show that you know how to organize a project
-   Use industry best practices wherever possible so that it gives us an idea of your experience

## Getting started

1. Install Deno: https://deno.land/manual/getting_started/installation
2. Populate the .env file with help of the example env file
3. Run the server with the following command: `deno task start`
