import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Mongo } from 'meteor/mongo';

import { HTTP } from 'meteor/http';
import { SERVER_CONFIG } from './server.config';
import { utils } from './utils';

const LikesCollection = new Mongo.Collection('likes');
Meteor.startup(() => {});

WebApp.connectHandlers.use('/api/discover/movie', (req, res, next) => {
    HTTP.call('GET', utils.themovieDBurl('discover'), {},

        function(error, response) {

            let newResponse = response.data;
            // newResponse.results.forEach(function(movieRessources) {

            let dbRessource = LikesCollection.findOne({ id: movieRessources.id });


            if (dbRessource) {

                movieRessources.like = dbRessource.like

            } else {

                movieRessources.like = 0;

            }
            //   });

            res.writeHead(200);
            res.write(JSON.stringify(newResponse));
            res.end();
        });


});

WebApp.connectHandlers.use('/api/like', (req, res, next) => {

    let toReturn;

    switch (req.method) {
        case 'GET':
            break;

        case 'PUT':

            const idMovie = utils.getIdMovieFromPathParam(req.url);

            toReturn = updateLikeMovie(parseInt(idMovie));

            res.writeHead(200);

            res.write(JSON.stringify(toReturn));

            break;

        default:

            break;

    }

    res.end();
});

WebApp.connectHandlers.use('/movie/:id', (req, res, next) => {


});

function updateLikeMovie(idMovie) {

    let dbRessource = LikesCollection.findOne({ id: idMovie });

    if (dbRessource) {
        LikesCollection.update({ _id: dbRessource._id }, { $inc: { like: 1 } });
    } else {
        LikesCollection.insert({ id: idMovie, like: 1 });
    }

    return LikesCollection.findOne({ id: idMovie });
}