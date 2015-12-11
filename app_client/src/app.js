var app = app || {};

app.Views.App = Backbone.View.extend({
    el: $('body'),
    initialize: function(){
        this.router = new app.Router();
        Backbone.history.start();
    }
});

new app.Views.App();
