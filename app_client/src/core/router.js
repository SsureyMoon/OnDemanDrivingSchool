var app = app || {};

app.Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'profile': 'profile',
        'login': 'login',
        'logout': 'logout',
        'search': 'search',
        'be-instructor':'beInstructor',
        'instructors/:id': 'selectInstructor',
        '*actions': 'index',
    },

    index: function(){
        this.navigate('/', {trigger:true, replace: true})
    },

    // before every view, we need to athenticate
    profile: function(){
        app.Global.nextView = "profile";
        var auth = new app.Models.Authentication();
        if(!auth.hasLocalToken()){
            this.navigate('login', { trigger: true, replace: true});
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
            this.navigate('login', { trigger: true, replace: true});
        } else {
            var userModel = new app.Models.User();
            var createInstructorModel = new app.Models.CreateInstructorModel();
            new app.Views.CreateInstructor({ user: userModel, model: createInstructorModel });
        }
    },
    selectInstructor: function(id){
        new app.Views.CheckInstructor();
    },
    logout: function(){
        var nextView = app.Global.nextView || 'search';
        var auth = new app.Models.Authentication();
        auth.logout();
        this.navigate(nextView, {trigger:true, replace: true})
    }
})
