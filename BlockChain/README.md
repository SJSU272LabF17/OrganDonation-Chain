# OrganChain Blockchain network

We are reusing one of the sample blockchain network and using the installation guidelines from 
https://github.com/zachgoll/hyperledger-composer-dev-tutorial/

Download hyperledger client and tools (or npm update if you have already installed)
```
npm install -g composer-cli
npm install -g generator-hyperledger-composer
npm install -g composer-rest-server
```

```
mkdir fabric-tools
cd fabric-tools
curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.zip
unzip fabric-dev-servers.zip
./downloadFabric.sh
./startFabric.sh
./createPeerAdminCard.sh
```

Now we need to create your .bna file

Go to directory BlockChain
```
cd perishable-network
mkdir dist
composer archive create --sourceType dir --sourceName . -a ./dist/perishable-network.bna
```

Deploy the network
```
composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName perishable-network
cd dist
composer network start --card PeerAdmin@hlfv1 -A admin -S adminpw -a perishable-network.bna -f networkadmin.card
composer card import -f networkadmin.card
composer card list
composer network ping --card admin@perishable-network
```

Start the composer server
```
composer-rest-server -c admin@perishable-network -n never > server.txt 2>&1 & 
```


