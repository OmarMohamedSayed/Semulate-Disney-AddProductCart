import axios from 'axios';
import cheerio from 'cheerio';
import {productID} from './variables.js'
import { sizeSelector, tokenSelector, quantitySelector } from "./selector.js";
import { getLoad, postVariation, addToCart } from "./requestsUrl.js";


async function findProductAddToCart() {
  try {
    //init token
    let csrf_token = "";
    //init SizeName
    let listOfSizesNames = [];
    //init limit quatity
    let availableQuantity = 0;
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
      //Remove disabled sizes
      listOfSizesName = listOfSizesName.filter((e) => e !== "");
    });
    //Object Data using in post Requests
    const postData = {
      format: "ajax",
      csrf_token: csrf_token,
      quatity: 1,
      pid: productID,
      cartAction: "add",
      size: listOfSizesName[0],
    };
    //request which post data to variation and return with available size & quantity 

    await axios.post(postVariation(postData['format'],postData['token'],postData['cartAction'],postData['pid'],postData['size'])).then((response) => {
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
    //check if quantity in response body available in database or not
    let validqantity =
      postData["quatity"] <= parseInt(availableQuantity)
        ? parseInt(postData["quatity"])
        : parseInt(availableQuantity);
    //request which post product to Cart
    await axios.post(addToCart(postVariation(postData['format'],postData['token'],validqantity,postData['pid']))).then((response) => {
      if (response.status !== 200) return "No Product Found";
      console.log("Add Product to Cart");
    });
  } catch (error) {
    console.log(error);
  }
}
//call function
findProductAddToCart()

