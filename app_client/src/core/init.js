var app = app || {};

app.Views = {};
app.Models = {};
app.Collections = {};
app.Global = {};
app.Helpers = {};

app.Helpers.setTokenHeader = function(){
    var token = $.cookie('jwt_token');
    if(!token){
        return false;
    }
    $.ajaxSetup({headers: {'Authorization': 'JWT '+token}});
    return true;
}

app.Helpers.hasCookie = function(name){
    return $.cookie('jwt_token') || false;
}

app.Helpers.templateLoader = function(templateName, data){
    return new Promise(function(resolve, reject){
        $.get('/src/templates/' + templateName, function(templateString){
            var template = _.template(templateString)(data);
            resolve(template);
        }, 'html')
    });
}

app.Helpers.errorHandler = function(response){
    if(response.status == 401){
        Backbone.history.navigate('login');
    }
    if(response.status == 500){
        alert("Server error!")
    }
}
