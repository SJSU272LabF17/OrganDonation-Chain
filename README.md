# ORGANCHAIN

![Alt text](/artifacts/SVICFINALIST.jpeg?raw=true "OrganChain at SVIC Finals")

OrganChain at SCIV

### Organ Waitlist ledger on a blockchain.

### Organ waitlist uses two servers :
### Backend server on 3001 and front end server on 3000.
  - Backend Docker Container can be found at : https://hub.docker.com/r/chiragarora17/organchain-backend/
Each server specs and details are located in their respective folders,in their README files.

To start backend server docker run 
```
docker pull chiragarora17/organchain-backend:latest
docker run -d -p 3001:3001 chiragarora17/organchain-backend:latest
```
### Introduction
A. How Organ Sharing Works

United Network for Organ Sharing(UNOS) is a private non-governmental organizations(NGO), which was awarded the sole contract for maintaining a Organ Procurement and Transplantation Network(OPTN). The responsibilities of UNOS includes managing the national transplant waiting list, matching donors to recipients based on a numeric score, and maintaining the database that contains information about all organ transplants performed in the United States. The numeric score is based on the data collected and stored by the hospital . In order to keep the data under intense security, UNOS has an in-house IT security team. The order of organ recipient waiting list is very important, since it has to be fair. Power and influence should not be a factor for moving people up and down in the list. 

B.  Problem 

Even though the system is designed to be impenetrable to tampering, the system is opaque. If UNOS assigns an organ to someone, we just need to trust UNOS that it assigned the organ to the person at the top of the list. This calls for an increase in transparency. 

C. Proposed Solution

The blockchain technology is a perfect solution to solve this problem because it can maintain an immutable ledger. In a Blockchained data storage  multiple peers in the network has their own replicated copy of the ledger. In addition to ledger information being distributed, the processes which update the ledger require a quorum. Moreover, in a permissioned and private blockchain, very specific data and operation access control can be specified. This project, Organ Chain, is a prototype of a web based application that tracks an organ from its donation to transplant with blockchain technology. 

D. Hill Statement

“As a member of the general public, I can view all the transactions performed on the patient waitlist, without being privy to the personal identities of the patients.”

E. LifeCycle Of an Organ in OrganChain

Four stages 
  1. Offered
  2. Tested
  3. Matched
  4. Transplanted
  
F Technologies Used
  1. Why Hyperledger Fabric?
      - It's private and permissioned
      - Provides comprehensive ACL options 
  2. Why Hyperledger Composer?
      - It simplifies Fabric application development process faster
    
## Advantages
  1. More Secure than existing platform
  2. Increases government transparency
  3. Will be cheaper than existing infrastructure

### You can Explore the organchain blockchain explorer at http://ec2-52-53-180-100.us-west-1.compute.amazonaws.com:8080/#
  In explorer  use the folowing link to access our blockchain's Swagger Documentation:
    http://ec2-52-53-180-100.us-west-1.compute.amazonaws.com:3000/explorer/swagger.json

## Architecture Diagram
![Alt text](/artifacts/overview_architecture.png?raw=true "Architecture Diagram")

## Future Enhancement
  1. Create organ specific smart contracts
  2. Provide APIs to public to make their own visualization tools
  3. Improve security by using TLS and HTTPS
  4. Provide Hospitals ability to update status of patient
  5. Approach more sponser users
  6. Follow-up with Hyperledger community
  7. Create better data visualization tools

