# Weather API

This app was made with [express](https://www.npmjs.com/package/express) framework.

## Installation

Use the package manager [npm](https://www.npmjs.com/package/npm) to run this app.

```bash
npm install
npm start
```

## Usage

This app allows you to make GET, POST, and DELETE requests.

The default port which the app is running on is 5000.

### GET
Make GET request to [localhost\:5000](http://localhost:5000) when the server is running to get the response.

### POST
Make POST request with request body in JSON format to update data for a location or create a new location if it doesn't exist yet.

#### Sample of request body:

```JSON
{
  "location": "Warszawa",
  "temperature": 18.5,
  "humidity": 35,
  "pressure": 1000
}
```

### DELETE
Make DELETE request with request body in JSON format to delete data for a specified location.

#### Sample of request body:

```JSON
{
  "location": "Warszawa"
}
```


## License
[MIT](https://choosealicense.com/licenses/mit/)