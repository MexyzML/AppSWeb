import { Meteor } from 'meteor/meteor';
import { localDatas } from './local-datas.js';
import { WebApp } from 'meteor/webapp';
import { Mongo } from 'meteor/mongo';

import { HTTP } from 'meteor/http';
import { SERVER_CONFIG } from './server.config';
import { utils } from './utils';

const likesCollection = new Mongo.Collection('likes');




Meteor.startup(() => {
    // If the Links collection is empty, add some data.
});

WebApp.connectHandlers.use('/api/discover/movie', (req, res, next) => {
    res.writeHead(200);
    res.end(JSON.stringify(localDatas));
});

WebApp.connectHandlers.use('/api/like', (req, res, next) => {

    let toReturn;

    switch (req.method) {
        case 'GET':
            break;

        case 'PUT':

            const idMovie = utils.getIdMovieFromPathParams(req.url);

            toReturn = updateLikeMovie(parseInt(idMovie));

            res.writeHead(200);

            res.write(JSON.stringify(toReturn));

            break;

        default:

            break;

    }

    res.end();
});