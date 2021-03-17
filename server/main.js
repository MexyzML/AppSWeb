import { Meteor } from 'meteor/meteor';
import { localDatas } from './local-datas.js';



Meteor.startup(() => {
    // If the Links collection is empty, add some data.
});

WebApp.connectHandlers.use('/api/discover/movie', (req, res, next) => {
    res.writeHead(200);
    res.end(JSON.stringify(localDatas));
});