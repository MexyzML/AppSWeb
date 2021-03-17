import { Meteor } from 'meteor/meteor';
import { localDatas } from './local-datas.js';
import { WebApp } from 'meteor/webapp';
import { HTTP } from 'meteor/http';
//import { SERVER_CONFIG } from './server.config';



Meteor.startup(() => {
    // If the Links collection is empty, add some data.
});

WebApp.connectHandlers.use('/api/discover/movie', (req, res, next) => {
    res.writeHead(200);
    res.end(JSON.stringify(localDatas));
});