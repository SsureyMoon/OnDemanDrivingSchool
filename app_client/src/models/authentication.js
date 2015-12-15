var app = app || {};

app.Models.Authentication = Backbone.Model.extend({
    url: 'http://local-pm.app.dev/api/v1/token-refresh/',
    defaults: {
        token: null,
        expire: null
    },
    initialize: function() {
        var token = $.cookie('jwt_token');
        // already logged in, but wants to extend session
        if(token){
            this.set('token', token);
            this.refreshToken();
            return true;
        }

        // after login, we store token to cookie
        if(this.get('token')){
            _.bind(this.saveToken, this)();
            return true;
        }

        return false;

	},

    hasLocalToken: function(){
        return this.get('token') || $.cookie('jwt_token');
    },

    authenticate: function(){
         var deferred = new $.Deferred();
         return deferred.promise();
    },

    refreshToken: function(){
        this.save()
            .success(_.bind(this.saveToken, this))
            .error(_.bind(app.Helpers.errorHandler, this));
        return this;
    },

    saveToken: function(){
        var token = this.get('token');

        var expire = new Date(new Date().setSeconds(this.get('expire')));
        var cookieOpts = {
            domain:'local-pm.app.dev',
            path: '/',
            expires: expire
        };

        $.cookie('jwt_token', token, cookieOpts)

        app.Helpers.setTokenHeader();

        return this;

    },
    logout: function(){
        this.removeToken();
    },
    removeToken: function(){
        this.set('token', null);
        this.set('expire', null);
        $.removeCookie('jwt_token', {path:'/', domain:'local-pm.app.dev'});
        return this;
    }


})
