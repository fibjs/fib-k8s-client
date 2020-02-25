'use strict'

/**
 * @file Convert a Swagger specification into a kubernetes-client API client.
 *
 * Represent Swagger a Path Item Object [1] with chains of objects:
 *
 *   /api/v1/namespaces -> api.v1.namespaces
 *
 * Associate operations on a Path Item Object with functions:
 *
 *   GET /api/v1/namespaces -> api.v1.namespaces.get()
 *
 * Represent Path Templating [2] with function calls:
 *
 *   /api/v1/namespaces/{namespace}/pods -> api.v1.namespaces(namespace).pods
 *
 * Iterate over a Paths Object [3] to generate whole API client.
 *
 * [1]: https://swagger.io/specification/#pathItemObject
 * [2]: https://swagger.io/specification/#pathTemplating
 * [3]: https://swagger.io/specification/#pathsObject
 */

const path = require('path');
const zlib = require('zlib');
const fs = require('fs');

const Component = require('./loader');
const Fetch = require('./fetch');

class Client {
  constructor(conf, spec) {
    conf = conf || {}
    if (!conf.host)
      throw new Error("Must specify hostname!")

    if (!conf.auth)
      throw new Error("Must specify at least one auth method!")

    const backend = new Fetch({ url: conf.host, auth: conf.auth })
    const root = new Component({ splits: [], backend })

    // read API spec
    if (!spec && conf.version) {
      const swaggerPath = path.join(
        __dirname,
        'apis',
        `swagger-${conf.version}.json.gz`)

      spec = JSON.parse(zlib.gunzipSync(fs.readFileSync(swaggerPath)))
      root._addSpec(spec)
    } else if (spec) {
      root._addSpec(spec)
    } else {
      throw new Error("Must specify API version or privide specificaiton object.")
    }

    return root
  }
}

module.exports = Client
