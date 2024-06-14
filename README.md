# Sac State CSC 131 Project - REST API Routes Break Down

All the routes use the root url https://ludus-db-dot-csc131.appspot.com/.

## Nominations

In our team's database, a document can be categorized as a nomination. A nomination document is composed of four fields: category, entity, winner, and year. Each field has a specific data type. Below defines each field's category in key map form.

```json
{
  "category": string,
  "entity": string,
  "winner": boolean,
  "year": number
}
```

### GET `/nominations/`

The nominations route, defined by using `/nominations/` right after the root url, provides a collection of resources. The structure of the data is in the form of a key mapped to an array of key map objects. The data structure will look like the example below.

```json
{
  "nominationList": []
}
```

Each index of the array has the key map structure of the following.

```json
{
  "nominationId": String,
  "info": {
    "category": string,
    "entity": string,
    "winner": boolean,
    "year": number
  }
}
```

Using the `/nominations/` route in a GET request will provide a `200` if successful and all nominations in the database.

### GET `/nominations/{ document ID }`

By using the `/nominations/` route with a singe prameter you can get a singlton document. The prameter must be the document id, anything else will provide a `404` and an error messege in json. The error looks like the example below.

```json
{
  "message": "Document dose not exsist"
}
```

### POST `/nominations/`

By using the `/nomination/` route you can also add documents to the database. Before you make a POST command, you do need to pass data over. The data has to be in JSON in the format below.

```json
{
  "category": string,
  "entity": string,
  "winner": boolean,
  "year": number
}
```

These four fields: category, entity, winner, and year are required. Giving less than these four will give a `404` error while providing more won't since we are only looking for those four fields. On a successful call you vill recive a `200` and the json data below.

```json
{
  "message": "nomination added",
  "info": {
    "category": string,
    "entity": string,
    "winner": boolean,
    "year": number
  }
}
```

### DELETE `/nominations/`

By using the `/nomination/` route you can also delete documents on the database. Before you make a DELETE command, you do need to pass data over. The data has to be in JSON in the format below. This method of deleting is useful when you know the parameters but not the document id.

```json
{
  "category": string,
  "entity": string,
  "winner": boolean,
  "year": number
}
```

The Resulting response can be the json below, this represents a successful delete and will return a `200` code.

```json
{
  "message": "document deleted",
  "document": "someID"
}
```

### DELETE `/nominations/{ document ID }`

By using the `/nominations/` route with a singe prameter you can delete a document. The prameter must be the document id anything else will provide a `404` and an error messege in json.

The Resulting response can be the json below, this represents a successful delete and will return a 200 code.

```json
{
  "message": "document deleted",
  "document": "someID"
}
```

## Nominations given category

This route is made for querying the oscar database for related information pertaining to category.

### GET, POST, DELETE `/nominations/category/`

Since the focus of the route is twords query category related information GET, POST, & DELETE will not work and will result in a status of `404` with the following json.

```json
{
  "message": "This is not a available"
}
```

If you desire to use GET, POST, or DELETE please refer to the [nominations route](#Nominations) section.

### GET `/nominations/category/{ category Field }`

By using the `/nominations/category/` route with a singe prameter you can get a collection of documents. The prameter must be valid category, anything else will provide a `404` and an error messege in json. The error looks like the example below.

```json
{
  "message": "Document dose not exsist"
}
```

## Nominations given entity

This route is made for querying the oscar database for related information pertaining to an entity.

### GET, POST, DELETE `/nominations/entity/`

Since the focus of the route is twords query entity related information GET, POST, & DELETE will not work and will result in a status of `404` with the following json.

```json
{
  "message": "This is not a available"
}
```

If you desire to use GET, POST, or DELETE please refer to the [nominations route](#Nominations) section.

### GET `/nominations/entity/{ entity Field }`

By using the `/nominations/entity/` route with a singe prameter you can get a collection of documents. The prameter must be valid entity, anything else will provide a `404` and an error messege in json. The error looks like the example below.

```json
{
  "message": "Document dose not exsist"
}
```

## Nominations given winner

This route is made for querying the oscar database for related information pertaining to a winner.

### GET, POST, DELETE `/nominations/winner/`

Since the focus of the route is twords query winner related information GET, POST, & DELETE will not work and will result in a status of `404` with the following json.

```json
{
  "message": "This is not a available"
}
```

If you desire to use GET, POST, or DELETE please refer to the [nominations route](#Nominations) section.

### GET `/nominations/winner/{ winner Field }`

By using the `/nominations/winner/` route with a singe prameter you can get a collection of documents. The prameter must be valid true or false, anything else will provide a `404` and an error messege in json. The error looks like the example below.

```json
{
  "message": "Document dose not exsist"
}
```

## Nominations given year

This route is made for querying the oscar database for related information pertaining to a year.

### GET, POST, DELETE `/nominations/year/`

Since the focus of the route is twords query year related information GET, POST, & DELETE will not work and will result in a status of `404` with the following json.

```json
{
  "message": "This is not a available"
}
```

If you desire to use GET, POST, or DELETE please refer to the [nominations route](#Nominations) section.

### GET `/nominations/year/{ year Field }`

By using the `/nominations/year/` route with a singe prameter you can get a collection of documents. The prameter must be valid year, anything else will provide a `404` and an error messege in json. The error looks like the example below.

```json
{
  "message": "Document dose not exsist"
}
```
