import { url, EndPoints } from "./variables.js";
//init Endpoint
export const getLoad = url + EndPoints["start_endpoint"];
//post variation Endpoint
export const postVariation = (format, token, cartAction, _id, sizeAvailable) =>
    `${url}${EndPoints["productVariation"]}?format=${format}&csrf_token=${token}&cartAction=${cartAction}&pid=${_id}&dwvar_${_id}_size=${sizeAvailable}`;
//post add to Cart Endpoint
export const addToCart = (format, token, validqantity, _id) => 
  `${url}${EndPoints["addToCart"]}?format=${format}&csrf_token=${token}&Quantity=${validqantity}&pid=${_id}`;
