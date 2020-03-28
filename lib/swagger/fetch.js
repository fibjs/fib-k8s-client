'use strict'

const URL = require('net').Url;
const http = require('http');
const ssl = require("ssl");

ssl.verification = ssl.VERIFY_NONE;

class FetchClient {
  /**
   * Fetch API client.
   * @param {object} options
   * @param {string} options.url - Base URL for API.
   * @param {function} options.auth - Auth information.
   */
  constructor(options) {
    this.url = options.url
    this.auth = options.auth
  }

  _fetch(url, opts) {
    opts = opts || {};
    let token = this.auth.token;
    let method = opts.method
    delete opts.method;

    opts.headers = {}
    opts.query['pretty'] = true
    opts.headers['Authorization'] = `bearer ${token}`
    opts.headers['Content-Type'] = 'application/json'
    if (method === 'PATCH') {
      opts.headers['Content-Type'] = 'application/strategic-merge-patch+json';
    }
    let resp = new http.Client().request(method, url, opts);

    return {
      status: resp.statusCode,
      statusMessage: resp.statusMessage,
      text: () => {
        return resp.readAll().toString()
      },
      json: () => {
        return resp.json()
      }
    }
  }
  /**
   * Invoke API request.
   * @param {object} options - options object.
   * @param {object} options.body - JSONifable object.
   * @param {string} options.method - HTTP method.
   * @param {string} options.pathItemObject - Swagger/OpenAPI Path Item Object.
   * @param {object} options.parameters - named query parameters.
   * @param {object} options.qs - named query parameters (legacy).
   * @param {string} options.pathname - URL pathname.
   * @param {boolean} options.stream - true if called by a "stream method".
   */
  http(options) {
    const body = JSON.stringify(options.body);
    const query = options.query || {};

    return this._fetch(new URL(this.url + options.pathname).href, {
      body,
      query,
      method: options.method
    })
  }
}

module.exports = FetchClient
