# fib-k8s-client



README：[中文](./README_CN.md) | [English](./README.md)



Simplified [Kubernetes API](http://kubernetes.io/) client for [FIBJS](http://fibjs.org/), supported:

- [Kubernetes API v1.13](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/)
- [Kubernetes API v1.12](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.12/)
- [Kubernetes API v1.11](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/)
- [Kubernetes API v1.10](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/)
- [Kubernetes API v1.9](./docs/v1.9)
- [Kubernetes API v1.8](./docs/v1.8)
- [Kubernetes API v1.7](./docs/v1.7)



## Install

Via fibjs：

```
fibjs --install fib-k8s-client
```



Or, via npm:

```
npm install fib-k8s-client
```



## Usage

### config

```javascript
/*
 * host: Kubernetes domain & port
 * version: API version
 * auth.token: Kubernetes access token
 */
const conf = {
    "host": "https://DOMAIN:PORT",
    "version": "1.13",
    "auth": {
        "token": "k8s access token"
    }
}
```



### Client Initialization

```javascript
const { Client } = require('fib-k8s-client');
client = new Client(conf);
```

 

### Basic Usage

**Access namespace list:**

```javascript
const namespaces = client.api.v1.namespaces.get();
```

**Create namespace：**

```javascript
const ns_json = require('./namespace.json');
client.namespaces.create(ns_json);
```

**Access specific namespace：**

```javascript
client.api.v1.namespaces('namespace_name').get();
```

**Remove namespace：**

```javascript
client.api.v1.namespaces('namespace_name').delete();
```

**Create pod：**

```javascript
const pod_json = require('./pod.json');
client.api.v1.namespaces('namespace_name').pods.post({ body: pod_json })
```

**Access pod from specific namespace：**

```javascript
client.api.v1.namespaces('namespace_name').pods('pod_name').get()
```

**remove pod：**

```javascript
client.api.v1.namespaces('namespace_name').pods('pod_name').delete();
```



fib-k8s-client supports `.delete`, `.get`, `.patch`, `.post`, and `.put`.



You could find more detailed usage in test cases from [test](./test) directory.



Full API interfaces documentation could find from [docs](./docs) directory(need download first):



### Initialize client with API specification

You could use provided API specification json to init your API client:

```javascript
const { Client } = require('fib-k8s-client');

const conf = {
    "host": "https://DOMAIN:PORT",
    "auth": {
        "token": "k8s access token"
    }
}

const spec = require("./api_spec.json")

client = new Client(conf, spec);
```



# Testing

```shell
fibjs test
```



# License

[GPL - 3.0](./LICENSE)