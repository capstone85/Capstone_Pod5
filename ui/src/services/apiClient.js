import axios from "axios";
import Confirmation from "../components/Confirmation/Confirmation";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "lifetracker_token";
  }

  async setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  async request({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
      user_id: data,
    };

    if (!this.token) {
      this.token = localStorage.getItem(this.tokenName);
    }
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({ url, method, data, headers });
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  async requestNoToken({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;

    try {
      const res = await axios({ url, method, data });
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  async listStores(user_id) {
    return await this.request({
      endpoint: `store`,
      method: `GET`,
      data: user_id,
    });
  }

  async listAllStores() {
    return await this.requestNoToken({
      endpoint: `store/stores`,
      method: `GET`,
    });
  }

  async createStore(store) {
    return await this.request({
      endpoint: `store`,
      method: `POST`,
      data: store,
    });
  }

  async listProduct(productId) {
    console.log("list product in apiclient is called", productId.productId);
    return await this.request({
      endpoint: `product/${productId.productId}`,
      method: `GET`,
      data: { productId: productId.productId },
    });
  }

  async listProducts(store_id) {
    return await this.request({
      endpoint: `:storeId/product`,
      method: `GET`,
      data: store_id,
    });
  }

  async listAllProducts() {
    return await this.requestNoToken({
      endpoint: `product/products`,
      method: `GET`,
    });
  }

  async createProduct(product) {
    return await this.request({
      endpoint: `product`,
      method: `POST`,
      data: product,
    });
  }

  /* * * * WISHLIST HTTP REQUESTS * * * */
  async addToWishlist(product_id) {
    // console.log("this is product id", product_id);
    return await this.request({
      endpoint: `product/wishlist/${product_id}`,
      method: `POST`,
      data: { product_id: product_id },
    });
  }

  async removeFromWishlist(productId) {
    console.log("");
    return await this.request({
      endpoint: `wishlist/delete/${productId}`,
      method: `DELETE`,
    });
  }

  async listAllWishlist(userId) {
    return await this.request({
      endpoint: `wishlist/${userId}`,
      method: `GET`,
    });
  }

  async checkIfInWishlist(product_id) {
    console.log("product id in apiclient", product_id);
    return await this.request({
      endpoint: `wishlist/product/${product_id}`,
      method: `GET`,
    });
  }

  /* * * * SHOPPING CART HTTP REQUESTS * * * */
  async deleteShoppingCart(userId) {
    return await this.request({
      endpoint: `shoppingCart/${userId}`,
      method: `DELETE`,
    });
  }

  async checkIfInCart(product_id) {
    console.log("product id in apiclient", product_id);
    return await this.request({
      endpoint: `shoppingCart/product/${product_id}`,
      method: `GET`,
    });
  }

  async incrementProductQuantity(productId) {
    return await this.request({
      endpoint: `shoppingCart/increment/${productId}`,
      method: `PUT`,
    });
  }

  async decrementProductQuantity(productId) {
    return await this.request({
      endpoint: `shoppingCart/decrement/${productId}`,
      method: `PUT`,
    });
  }

  async removeFromCart(productId) {
    return await this.request({
      endpoint: `shoppingCart/delete/${productId}`,
      method: `DELETE`,
    });
  }

  async addToShoppingCart(product_id) {
    return await this.request({
      endpoint: `shoppingCart`,
      method: `POST`,
      data: { product_id: product_id },
    });
  }

  async listAllShoppingCart(userId) {
    return await this.request({
      endpoint: `shoppingCart/${userId}`,
      method: `GET`,
      data: userId,
    });
  }

  /* * CHECKOUT HTTP REQUESTS * */
  async addToCheckout(confirmation, product_id) {
    console.log("this is product id", product_id);
    console.log("this is confirmation ", confirmation);
    return await this.request({
      endpoint: `checkout`,
      method: `POST`,
      data: { confirmation: confirmation, product_id: product_id },
    });
  }

  async listCheckoutByOrderId(orderId) {
    return await this.request({
      endpoint: `checkout/${orderId}`,
      method: `GET`,
      data: orderId,
    });
  }

  async listCheckoutByUserId(userId) {
    return await this.request({
      endpoint: `checkout/`,
      method: `GET`,
      data: userId,
    });
  }

  async addDeliveryDetails(order, confirmNum) {
    console.log("ORDER", order);
    console.log("CONFRIM NUM", confirmNum);
    return await this.request({
      endpoint: `order/${confirmNum}`,
      method: `POST`,
      data: order,
      confirmNum,
    });
  }

  async listDeliveryDetails(confirmNum) {
    console.log("CONFRIM NUM", confirmNum);
    return await this.request({
      endpoint: `order/orders/${confirmNum}`,
      method: `GET`,
      data: { confirmNum: confirmNum },
    });
  }

  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` });
  }

  async loginUser(credentials) {
    return await this.request({
      endpoint: `auth/login`,
      method: `POST`,
      data: credentials,
    });
  }

  async signUpUser(credentials) {
    return await this.request({
      endpoint: `auth/register`,
      method: `POST`,
      data: credentials,
    });
  }

  async logoutUser() {
    this.setToken(null);
    localStorage.setItem(this.tokenName, "");
  }
}

export default new ApiClient("http://localhost:5174");
