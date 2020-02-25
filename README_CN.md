# fib-k8s-client



README：[中文](./README_CN.md) | [English](./README.md)



兼容 [FIBJS](http://fibjs.org/) 的 [http://kubernetes.io/](http://kubernetes.io/) 简易客户端，支持同步调用，目前支持：

- [Kubernetes API v1.13](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/)
- [Kubernetes API v1.12](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.12/)
- [Kubernetes API v1.11](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/)
- [Kubernetes API v1.10](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/)
- [Kubernetes API v1.9](./docs/v1.9)
- [Kubernetes API v1.8](./docs/v1.8)
- [Kubernetes API v1.7](./docs/v1.7)



## 安装



通过 fibjs 安装：

```
fibjs --install fib-k8s-client
```



或者，通过 npm 安装：

```
npm install fib-k8s-client
```



## 使用方式

### config 配置项

```javascript
/*
 * host: Kubernetes 服务地址以及端口
 * version: API 版本
 * auth.token: Kubernetes 的访问令牌
 */
const conf = {
    "host": "https://DOMAIN:PORT",
    "version": "1.13",
    "auth": {
        "token": "k8s access token"
    }
}
```



### 初始化客户端

```javascript
const { Client } = require('fib-k8s-client');
client = new Client(conf);
```



### 基础使用

**访问 namespace 列表：**

```javascript
const namespaces = client.api.v1.namespaces.get();
```

**创建 namespace：**

```javascript
const ns_json = require('./namespace.json');
client.namespaces.create(ns_json);
```

**访问指定 namespace：**

```javascript
client.api.v1.namespaces('namespace_name').get();
```

**删除 namespace：**

```javascript
client.api.v1.namespaces('namespace_name').delete();
```

**创建 pod：**

```javascript
const pod_json = require('./pod.json');
client.api.v1.namespaces('namespace_name').pods.post({ body: pod_json })
```

**访问 namespace 下的 pod：**

```javascript
client.api.v1.namespaces('namespace_name').pods('pod_name').get()
```

**删除 pod：**

```javascript
client.api.v1.namespaces('namespace_name').pods('pod_name').delete();
```



fib-k8s-client 支持 `.delete`, `.get`, `.patch`, `.post` 以及 `.put`.



你可以在测试用例（[test](./test)）目录下看到更多具体用法。



全部 API 接口文档请参考 [docs](./docs) 目录（需要下载）



### 使用指定 API 规范生成客户端

除了使用库中提供的以上版本的 Kubernetes API，您还可以提供指定的 API 规范文件来生成客户端：

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



## 测试

运行测试用例：

```
fibjs test
```



# License

[GPL - 3.0](./LISENCE)