var app = app || {};

app.Views = {};
app.Models = {};
app.Collections = {};
app.Global = {};
app.Helpers = {};

/**
 *
 */
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

/**
 *
 */
$.fn.stars = function(starSize) {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * starSize;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}
