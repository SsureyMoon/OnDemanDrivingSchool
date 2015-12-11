var app = app || {};

app.Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'profile': 'profile',
        'login': 'login',
        'search': 'search',
        'be-instructor':'beInstructor',
        '*actions': 'index'
    },

    index: function(){
        this.navigate('/', {trigger:true, replace: true})
    },

    profile: function(){
        app.Global.nextView = "profile";
        if(!app.Helpers.hasCookie('jwt_token')){
            this.navigate('login', { trigger: true, replace: true });
        } else {
            var userModel = new app.Models.User();
            new app.Views.Profile({ model: userModel });
        }
    },

    search: function(){
        app.Global.nextView = "search";
        var instructors = new app.Collections.Instructors();
        new app.Views.Search({ collection: instructors });
    },

    login: function(){
        app.Global.nextView = app.Global.nextView || "search";
        var loginModel = new app.Models.LoginModel();
        new app.Views.Login({ model: loginModel });
    },

    beInstructor: function(){
        app.Global.nextView = "be-instructor";
        if(!app.Helpers.hasCookie('jwt_token')){
            this.navigate('login', { trigger: true, replace: true });
        } else {
            var createInstructorModel = new app.Models.createInstructorModel();
            new app.Views.createInstructor({ model: createInstructorModel });
        }
    }
})
