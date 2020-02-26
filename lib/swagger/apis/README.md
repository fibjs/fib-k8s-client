**How to fetch newer version of API specs?**

```
wget -O swagger-${version}.json https://raw.githubusercontent.com/kubernetes/kubernetes/release-${version}/api/openapi-spec/swagger.json

gzip swagger-${version}.json
```