var test = require("test");
test.setup();
const Client = require('../').Client;
const conf = require('./config.json')

const namespaceConf = {
    "apiVersion": "v1",
    "metadata": {
        "name": "ns-testcase"
    },
    "kind": "Namespace",
    "id": "testspace"
};

const podConf = {
    "apiVersion": "v1",
    "kind": "Pod",
    "metadata": {
        "name": "test-busybox"
    },
    "spec": {
        "containers": [
            {
                "name": "busybox",
                "image": "busybox:latest",
                "ports": [
                    {
                        "containerPort": 80
                    }
                ]
            }
        ]
    }
}

describe("basic test", () => {
    it("access namespace list", () => {
        const client = new Client(conf);
        const r = client.api.v1.namespaces.get();

        assert.equal(r.statusMessage, "OK")
        assert.equal(r.json().kind, "NamespaceList");
    });

    it("create namespaces", () => {
        const client = new Client(conf);
        let r = client.api.v1.namespaces.post({ body: namespaceConf });

        assert.equal(r.statusMessage, "Created")
    });

    it("access namespace", () => {
        const client = new Client(conf);
        let r = client.api.v1.namespaces(namespaceConf.metadata.name).get();

        assert.equal(r.statusMessage, "OK");
        assert.equal(r.json().kind, "Namespace");
        assert.equal(r.json().metadata.name, namespaceConf.metadata.name);
    });

    it("create pod", () => {
        const client = new Client(conf);
        let r = client.api.v1.namespaces(namespaceConf.metadata.name).pods.post({ body: podConf })

        assert.equal(r.statusMessage, "Created")
    });

    it("access pod from specific namespace", () => {
        const client = new Client(conf);
        let r = client.api.v1.namespaces(namespaceConf.metadata.name).pods(podConf.metadata.name).get()

        assert.equal(r.statusMessage, "OK")
        assert.equal(r.json().kind, "Pod");
        assert.equal(r.json().metadata.name, podConf.metadata.name);
    });

    it("patch pod from specific namespace", () => {
        const client = new Client(conf);
        let patch_json = {
            "spec": {
                "containers": [
                    {
                        "name": "busybox",
                        "image": "busybox:1.31",
                        "ports": [
                            {
                                "containerPort": 80
                            }
                        ]
                    }
                ]
            }
        }
        let r = client.api.v1.namespaces(namespaceConf.metadata.name).pods(podConf.metadata.name).patch({ body: patch_json });

        assert.equal(r.json().spec.containers[0].image, "busybox:1.31");
    });

    it("delete pod", () => {
        const client = new Client(conf);
        let r = client.api.v1.namespaces(namespaceConf.metadata.name).pods(podConf.metadata.name).delete();

        assert.equal(r.statusMessage, "OK")
    })

    it("delete namespace", () => {
        const client = new Client(conf);
        let r = client.api.v1.namespaces(namespaceConf.metadata.name).delete();

        assert.equal(r.statusMessage, "OK")
    });
})

require.main === module && test.run();
