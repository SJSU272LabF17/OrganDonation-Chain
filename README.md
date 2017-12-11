Organ Waitlist ledger on a blockchain.

Organ waitlist uses two servers :
Backend server on 3001 and front end server on 3000.

Each server specs and details are located in their respective folders.

### Introduction
United Network for Organ Sharing (UNOS) is currently responsible for organ sharing, and they maintain a database containing available organs and patients awaiting to receive them. According to ‘organtransplants.org’, transplant waiting list is the most scrutinized, heavily analyzed and debated among the federal government, the medical profession and the public.
Due to the fact that organ transplant is built upon altruism and public trust, if anything shakes that trust, everyone will lose. Therefore, integrity of the organ transplant waiting list is of the utmost importance. We believe that the Blockchain technology can help alleviate that issue. In this project, we create the OrganChain, which uses the Blockchain technology and provides a platform for donors, hospital and UNOS to integrate better on organ transplant process. The front-end user interface is developed with React, and we use Node.js with express package as the back-end server. MongoDB is served as the database along with Mongoose for object modeling. For the Blockchain implementation, we make use of the Hyperledger Fabric project.  

### What is Blockchain
Blockchain as a shared, replicated transaction system which is updated via smart contracts and kept consistently synchronized through a collaborative process called consensus. Every participant in it has their own replicated copy of the ledger. In addition to ledger information being shared, the processes which update the ledger are also shared. Unlike today’s systems, where a participant’s private programs are used to update their private ledgers, a Blockchain system has shared programs to update shared ledgers.

### Application scenarios
* Steps: 
1.	Organ donors visits the OrganChain site and get motivated to donate
2.	Donor creates a donor account and logs in
3.  Donor registers his/her organ
4.	Donor picks a hospital to make an appointment for medical testing
5.	Hospital conducts tests, gathers data and shares with UNOS
6.	Other hospitals add recipients and share with UNOS
7.	UNOS matches suitable donor-recipient organ pairs and generates appointment for transplant 
8.	The recipient hospital performs transplant
