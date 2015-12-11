var app = app || {};

app.Views.Search = Backbone.View.extend({
    el: "#template-content",
    id: 'search-holder',
    template: 'search.html',
    events: {
    },
    initialize: function(){
        this.render();
        this.collection.on('change', _.bind(this.render, this));

    },
    render: function(){
        var _this = this;
        app.Helpers.templateLoader(this.template, this.collection.toJSON())
            .then(function(templateData){
                _this.$el.html(templateData);
                _this.renderMap();
            }, function(){
                console.log("failed");
            });
        return this
    },
    renderMap: function(){
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(37.7856655,-122.4223671),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 14
        });
    }
});
