import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';

import './main.html';

Template.home.onCreated(function homeOnCreated() {
    let ctrl = this;
    this.movies = new ReactiveVar();
    HTTP.call('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=1793c4843a64fbd6fdba88ce08e45c5f&language=fr-FR', {},
        function(error, response) {
            // Handle the error or response here.
            ctrl.movies.set(JSON.parse(response.content).results)
        });
});
Template.home.helpers({
    movies() {
        return Template.instance().movies.get();
    }
});

Template.home.events({

    'click button' (event, instance) {

        const idMovie = event.currentTarget.dataset.id;

        Like(idMovie, Template.instance().movies);
    }
});

function Like(idMovie, movies) {

    HTTP.call('PUT', 'http://localhost:3000/api/like/' + idMovie, {},
        function(error, response) {
            const index = movies.get().findIndex(function(item) {

                return item.id === JSON.parse(response.content).Like;
            })


            if (index > -1) {

                let newMoviesList = movies.get();

                newMoviesList[index].like = JSON.parse(response.content).like;

                movies.set(newMoviesList);

            }

        });
}