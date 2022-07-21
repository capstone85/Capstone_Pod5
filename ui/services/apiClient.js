import axios from "axios";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "lifetracker_token";
  }

  async setToken(token) {
    this.token = token;
    console.log("token being set in browser storage",token)
    localStorage.setItem(this.tokenName, token);
  }

  async request({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
      user_id: data,
    };

    if (this.token) {
      console.log(typeof this.token)
      console.log(this.token,"being added to header")
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({ url, method, data, headers });
      return { data: res.data, error: null };
    } catch (error) {
      //console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  async listActivities(user_id) {
    return await this.request({
      endpoint: `activity`,
      method: `GET`,
      data: user_id,
    });
  }

  async listSleeps(user_id) {
    return await this.request({
      endpoint: `sleep`,
      method: `GET`,
      data: user_id,
    });
  }

  async createSleep(sleep) {
    return await this.request({
      endpoint: `sleep`,
      method: `POST`,
      data: sleep,
    });
  }

  async listExercises(user_id) {
    return await this.request({
      endpoint: `exercise`,
      method: `GET`,
      data: user_id,
    });
  }

  async createExercise(exercise) {
    return await this.request({
      endpoint: `exercise`,
      method: `POST`,
      data: exercise,
    });
  }

  async listNutritions(user_id) {
    console.log("user_id", user_id);
    return await this.request({
      endpoint: `nutrition`,
      method: `GET`,
      data: user_id,
    });
  }

  async createNutrition(nutrition) {
    return await this.request({
      endpoint: `nutrition`,
      method: `POST`,
      data: nutrition,
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

export default new ApiClient("http://localhost:3001");