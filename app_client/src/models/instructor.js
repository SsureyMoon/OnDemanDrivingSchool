var app = app || {};

app.Models.Instructor = Backbone.Model.extend({
})


app.Collections.Instructors = Backbone.Collection.extend({
    model: app.Models.Instructor
})


app.Models.createInstructorModel = Backbone.Model.extend({
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
        console.log('this')
        console.log(this)
        this.save()
            .success(function(e){
                // let's log in and get token
                console.log(this);
                console.log('success')
            })
            .error(function(e){
                console.log(e);
                console.log('fail')
            });
        return this;
    }
});
