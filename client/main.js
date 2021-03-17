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