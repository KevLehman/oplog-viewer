# Oplog Viewer
A simple tool to view the oplog of a MongoDB database.

# Usage
```
npm run start -- --host xxxx --filter meteor.*
```

## Sample output
```
Received event UPDATE from oplog
{
  "op": "u",
  "ns": "meteor.instances",
  "ui": "O+IkiwbXRb+7qoIe1Ibmkw==",
  "o": {
    "$v": 2,
    "diff": {
      "u": {
        "_updatedAt": "2022-11-17T17:39:36.151Z"
      }
    }
  },
  "o2": {
    "_id": "jQfiGs7EhkhkSwWmB"
  },
  "ts": "7167041029533597697",
  "t": 39,
  "v": 2,
  "wall": "2022-11-17T17:39:36.151Z"
}
```

# How to install
```
npm install
npm run build
npm run start
```

# For the future
- [ ] Support authentication
- [ ] Support multiple databases
- [ ] Better printing on output
- [ ] Dynamic event subscribing