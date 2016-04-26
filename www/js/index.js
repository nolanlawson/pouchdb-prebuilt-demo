/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        // copy a database file from www/ in the app directory to the data directory
        function copyDatabaseFile(dbName) {
          var sourceFileName = cordova.file.applicationDirectory + 'www/' + dbName;
          var targetDirName = cordova.file.dataDirectory;
          return Promise.all([
            new Promise(function (resolve, reject) {
              resolveLocalFileSystemURL(sourceFileName, resolve, reject);
            }),
            new Promise(function (resolve, reject) {
              resolveLocalFileSystemURL(targetDirName, resolve, reject);
            })
          ]).then(function (files) {
            var sourceFile = files[0];
            var targetDir = files[1];
            return new Promise(function (resolve, reject) {
              targetDir.getFile(dbName, {}, resolve, reject);
            }).catch(function () {
              return new Promise(function (resolve, reject) {
                sourceFile.copyTo(targetDir, dbName, resolve, reject);
              });
            });
          });
        }

        copyDatabaseFile('_pouch_turtles.db').then(function () {
          // database ready!
          var db = new PouchDB('turtles.db', {adapter: 'websql'});
          return db.allDocs({include_docs: true});
        }).then(function (results) {
          var pre = document.createElement('pre');
          pre.innerHTML = JSON.stringify(results, null, '  ');
          document.body.appendChild(pre);
        }).catch(console.log.bind(console));
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
