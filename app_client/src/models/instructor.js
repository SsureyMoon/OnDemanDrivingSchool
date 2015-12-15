var app = app || {};

app.Models.Instructor = Backbone.Model.extend({
})


app.Collections.Instructors = Backbone.Collection.extend({
    url: 'http://local-pm.app.dev/api/v1/instructors/',
    model: app.Models.Instructor,
    origin: 1,
    search: function(query){
        return this.fetch({
            data: query,
            processData: true
        });
    },
    parse: function(response){
        return response.instructors;
    }
})


app.Models.CreateInstructorModel = Backbone.Model.extend({
    url: 'http://local-pm.app.dev/api/v1/instructors/',
    validation: {
        location: {
			required: true
		},
        car_img: {
			required: true
		},
        license_img: {
			required: true
		}
    },
    register: function(){
        this.save()
            .success(function(e){
                // let's log in and get token
            })
            .error(function(e){
            });
        return this;
    }
});
