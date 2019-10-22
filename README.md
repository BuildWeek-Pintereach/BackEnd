# BackEnd


### 1. Graph of all users

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: https://pintereach-be.herokuapp.com/users
```


### 2. All categories

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: https://pintereach-be.herokuapp.com/categories
```


### 3. Create a new article

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://pintereach-be.herokuapp.com/:id/article
```

***Body:***

```js        
{
	"title" : "How to XYZ",
	"url" : "https://google.com",
	"type" : "Biology"
}
```


### 4. Delete an article

***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: https://pintereach-be.herokuapp.com/article/:id
```


### 5. Get all the article of a user

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: https://pintereach-be.herokuapp.com/:id/articles
```


### 6. Create a new user

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://pintereach-be.herokuapp.com/register
```

***Body:***

```js        
{
  "firstname" : "John",
  "lastname" : "Doe",
  "email" : "john@doe.com",
  "password" : "1234"
}
```







