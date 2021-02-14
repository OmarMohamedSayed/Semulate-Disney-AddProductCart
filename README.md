# Simulate-DisneyStore-AddProductCart
## HTTP Requests by NodeJS Using Axios & Cheerio!

This application is using HTTP requests to simulate  get product information , select size 
and quantity for the product and add the selected product to cart & AddProductToCart

[![npm package](https://nodei.co/npm/request.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/request/)

## Install
```js
  download Node from https://nodejs.org/en/download/
```
## Running
```js
  -npm init -y
  -npm i axios cheerio 
```
## Using Axios 
  using HTTP Async/await requests
  ### Using Get Request 
  ```js
    //Get loading PeoductInfo Page
    await axios.get(getLoad).then((response) => {
      if (response.status !== 200) return "No Product Found";
      console.log("loading Success");
      //load allData from request
      const getdata = response.data;
      //Using Cheerio to select tags
      const $ = cheerio.load(getdata);
      //Get csrf_token
      csrf_token = $(tokenSelector).val();
      //Get all Avalilable Size
      listOfSizesName = $(sizeSelector)
        .find("button")
        .toArray()
        .map((element) =>
          $(element).attr("class") !==
          "variation__size variation__size--disabled "
            ? $(element).attr("data-value").replace(" ", "%20")
            : ""
        );
  ```
  ### Using Post Requests 
  ```js
    //request which post data to variation and return with available size & quantity 
    await axios.post(
      postVariation(postData['format'],postData['token'],postData['cartAction'],postData['pid'],postData['size']))
        .then((response) => {
          if (response.status !== 200) return "No Product Found";
          console.log("Valid Product");
          //load allData from request
          const getdata = response.data;
          //Using Cheerio to select tags
          const $ = cheerio.load(getdata);
          //Get csrf_token
          availableQuantity = $(quantitySelector)
            .text()
            .replace(")", "")
            .split(" ");
          availableQuantity = availableQuantity[1];
    });
  ```
  ```js
    await axios.post(addToCart(
      postVariation(postData['format'],postData['token'],validqantity,postData['pid']))).then((response) => {
        if (response.status !== 200) return "No Product Found";
        console.log("Add Product to Cart");
    });
  ```
