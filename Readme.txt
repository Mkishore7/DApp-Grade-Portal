This Decentralised App was created by Mohit Kishore, 1701CS28.

Please ensure you have the following tools available in order to run the app:
1. Ganache
2. MetaMask Chrome Extension
3. Truffle Framework
4. Node Package Manager (NPM)

Use the following command to compile and reset the blockchain:
$ truffle migrate --reset

Next, start your development server from the command line like this:

$ npm run dev

This should automatically open a new browser window with your client-side application.

Notice that your application says "Loading...". That's because we're not logged in to the blockchain yet! In order to connect to the blockchain, we need to import one of the accounts from Ganache into Metamask. 

Once we are connected with Metamask, we should see all of the contract and account data loaded.

On top of the window we will see the list of all students present in our blockchain. By default it will be none, we have to add it.

You should see three forms:

1. Grade Upgrade: will be used to upgrade the grades of an existing student.

2. Add Student: Will be used to add a new student to the blockchain.

3. Check Grade: will be used to show the marks of an existing student.


Due to time constraint I was not able to implement the pseudo-anonymity. However, I have mentioned the method by which we can ensure pseudoanonymity in our app.

We can use the public key of the student to encrypt the grade which will only be visible upon the usage of the private key alongwith roll no by the student, thus allowing only the student to be able to see his/her grade.


---------Thank You-----------