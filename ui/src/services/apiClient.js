import axios from "axios";

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

  async addToWishlist(product_id) {
    console.log("this is product id", product_id);
    return await this.request({
      endpoint: `wishlist`,
      method: `POST`,
      data: { product_id: product_id },
    });
  }

  async listAllWishlist(userId) {
    return await this.request({
      endpoint: `wishlist/${userId}`,
      method: `GET`,
      data: userId,
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

  async listProduct(productId) {
    console.log("list product in apiclient is called", productId.productId);
    return await this.request({
      endpoint: `product/${productId.productId}`,
      method: `GET`,
      data: { productId: productId.productId },
    });
  }

  async addToCheckout(order_id, product_id) {
    console.log("this is product id", product_id);
    console.log("this is order id: ", order_id);
    return await this.request({
      endpoint: `checkout`,
      method: `POST`,
      data: { order_id, product_id: product_id },
    });
  }

  async fetchUserFromToken() {
    const res = await this.request({ endpoint: `auth/me`, method: `GET` });
    console.log(res);
    return res;
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
