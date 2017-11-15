OrganChain Backend server

Implemented in javascript / node.js, the server is hosted using express modules. It uses mongodb as a backend database.

MongoDB is used for storing useful information only. Blockchain Transactions are not stored at all. Blockchain
transactions are stored by hyperledger.

Server save and fetches the blockchain transaction through middleware code written in go-lang.