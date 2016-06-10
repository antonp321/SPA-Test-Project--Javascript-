var app = app || {};

app.requester = (function(){
   function Requester(appId, appSecret, baseUrl) {
       this.appId = appId;
       this.appSecret = appSecret;
       this.baseUrl = baseUrl;
   }

    // 4 methods : GET, POST, PUT, DELETE
    Requester.prototype.get = function(url, useSession) {
        var headers = getHeaders(false, useSession);
        return makeRequest('GET', url, headers, null);
    };

    Requester.prototype.post = function(url, useSession, data) {
        var headers = getHeaders.call(this, data, useSession);
        return makeRequest('POST', url, headers, data);
    };

    Requester.prototype.put = function(url, useSession, data) {
        var headers = getHeaders.call(this, data, useSession);
        return makeRequest('PUT', url, headers, data);
    };

    Requester.prototype.delete = function(url, useSession) {
        var headers = getHeaders.call(this, false, useSession);
        return makeRequest('DELETE', url, headers, null);
    };

    //MakeRequest common function
    function makeRequest(method, url, headers, data){
        var defer = Q.defer();

        $.ajax({
            method: method,
            url: url,
            headers: headers,
            data: JSON.stringify(data) || null,
            success: function(data){
                defer.resolve(data);
            },
            error: function(error){
                defer.reject(error);
            }
        });

        return defer.promise;
    }

    function getHeaders(isJSON, useSession) {
        var headers = {};
        var token;

        if(isJSON) {
            headers['Content-Type'] = 'application/json';
        }

        if(useSession) {
            token = sessionStorage['sessionId'];
            headers['Authorization'] = 'Kinvey ' + token;
        }
        else{
            token = this.appId + ':' + this.appSecret;
            headers['Authorization'] = 'Basic ' + btoa(token);
        }

        return headers;
    }

    return {
        load: function(appId, appSecret, baseUrl){
            return new Requester(appId, appSecret, baseUrl);
        }
    }

}());