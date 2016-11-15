pouchdb-prebuilt-demo
=====

Demo of a prebult PouchDB database, used in a Cordova app.

To run this code from scratch, just do:

```bash
git clone https://github.com/nolanlawson/pouchdb-prebuilt-demo.git
cd pouchdb-prebuilt-demo
cordova platform add android
cordova prepare
cordova run android
```

Or on iOS:

```bash
cordova platform add ios
cordova run ios
```

### Update for PouchDB 6

This demo now uses PouchDB 6 and pouchdb-adapter-cordova-sqlite 2. For PouchDB 5 and pouchdb-adapter-cordova-sqlite 1, see [this commit](https://github.com/nolanlawson/pouchdb-prebuilt-demo/tree/613abb61d94af7efc50051a90051a983bb8404f7).
