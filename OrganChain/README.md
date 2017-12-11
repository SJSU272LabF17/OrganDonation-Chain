OrganChain Backend server

Implemented in javascript / node.js, the server is hosted using express modules. It uses mongodb as a backend database.

MongoDB is used for storing useful information only. Blockchain Transactions are not stored at all. Blockchain
transactions are stored by hyperledger.

Server save and fetches the blockchain transaction through middleware code written in go-lang.

For back-end:-
1. go to ./OrganChain
2. To install node modules run command- npm install 
3. To start server run command- npm start
Server will start on http://localhost:3001/ 