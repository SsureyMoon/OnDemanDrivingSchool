var app = app || {};

app.Views.Search = Backbone.View.extend({
    el: "#template-content",
    id: 'search-holder',
    template: 'search.html',
    origin: null,
    markers:[],
    events: {
        'submit form#search-instructor-form': 'searchInstructor'
    },
    initialize: function(){
        this.render();
        // this.collection.on('add', _.bind(this.render, this));
    },
    render: function(){
        var _this = this;
        app.Helpers.templateLoader(this.template, this.collection.toJSON())
            .then(function(templateData){
                _this.$el.html(templateData);
                _this.renderMap(_this.origin);
                _this.renderMarkers(_this.collection.toJSON())
            }, function(){
                console.log("failed");
            });
        return this
    },
    searchInstructor: function(e){
        e.preventDefault();
        var _this = this;
        var query = {
            location: $('#zip-or-address').val(),
            distance: 5
        };
        this.collection.search(query).success(function(response){
            console.log('response');
            console.log(response);
            _this.origin = new google.maps.LatLng(
                response.origin.lat,
                response.origin.lon
            );

            _this.render(_this.origin)
        });
    },
    renderMap: function(center){
        if(!center)
            var center = new google.maps.LatLng(37.7856655,-122.4223671)

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 14
        });
    },
    renderMarker: function(instructor){
        var lat_long_points = instructor.lat_long_points;
        var _this = this
        var marker = new google.maps.Marker({
            map: _this.map,
            animation: google.maps.Animation.DROP,
            clickable: true,
            position: {lat: lat_long_points.lat, lng: lat_long_points.lon},
        });
        marker.info = instructor;
        marker.addListener('click', function(e){
            var info = this.info;
            var content =
                '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h3 id="firstHeading" class="firstHeading">'+info.username+'</h1>'+
                    '<div id="bodyContent">'+
                        '<div class="row">'+
                            '<div class="col-xs-10 col-sm-5">'+
                                '<img class="car-img" src="'+info.car_img+'"/>'+
                            '</div>'+
                            '<div class="col-xs-10 col-sm-5">'+
                                '<p>He is a great driver.</p>'+
                                '<span class="stars">'+info.rating+'</span>'+
                                '<a class="right" href="/#instructors/'+info.id+'">See detail</a>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';


            var windowWidth = $(window).width();
            var maxWidth = windowWidth*0.3;
            var starSize = 30;
            if(windowWidth < 700){
                maxWidth = windowWidth*0.5;
                starSize = 20;
            }


            var infowindow = new google.maps.InfoWindow({
                content: content,
                maxWidth: maxWidth
            });
            infowindow.addListener('domready', function(e){
                console.log('e');
                console.log(e);
                console.log(this);
                $('span.stars').stars(starSize);
            })

            infowindow.open(_this.map, this);

        })
        this.markers.push(marker);
    },
    renderMarkers: function(instructors){
        console.log('instructors');
        console.log(instructors);
        var _this = this;
        _.each(instructors, function(element, index, list){
            console.log('should called twice');
            console.log(element);
            console.log(index);
            _this.renderMarker(element);
        });
    }
});
