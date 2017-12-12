# OrganChain Backend server

Implemented in javascript / node.js, the server is hosted using express modules. It uses mongodb as a backend database.

MongoDB is used for storing useful information only. Blockchain Transactions are not stored at all. Blockchain
transactions are stored by hyperledger.

Server stores user data in the MongoDB and the transactions get stored in MongoDB and Blockchain. Using the Hyperledger Blockchain Explorer, we can show the blocks and transactions happening live in our system. 

Pre-requisites : 
1) install Node and npm    
2) Our Organchain composer network / Blockchain setup


To deploy Locally : 
```
1) go to the OrganChain directory
2) run "npm install"
3) run "npm start"
4) Backend server should be up at http://localhost:3001/historian
```

To deploy our container by Docker :
```
1) Install Docker on the machine based on your OS.
2) run "docker run -d -p 3001:3001 chiragarora17/organchain-backend"
3) Backend server should be up at http://<Machine IP>:3001/historian