var app = app || {};

app.storeModel = (function(){
    function StoreModel(requester){
        this.requester = requester;
    }

    StoreModel.prototype.getItems = function(){
        var appId = this.requester.appId;
        var theUrl = 'https://baas.kinvey.com/appdata/'+ appId + '/items/?resolve=type&retainReferences=false';
        return this.requester.get(theUrl, true);
    };
    
    // StoreModel.prototype.getItemById = function(itemId){
    //     var appId = this.requester.appId;
    //     var theUrl = 'https://baas.kinvey.com/appdata/'+ appId + '/items/' + itemId + '?resolve=type&retainReferences=false';
    //     return this.requester.get(theUrl, true);
    // };

    StoreModel.prototype.addItemToHero = function(data, heroId){
        var appId = this.requester.appId;
        var theUrl = 'https://baas.kinvey.com/appdata/'+ appId + '/heroes/' + heroId;
        console.log(data);
        return this.requester.put(theUrl, true, data);
    };

    return {
        load: function(requester){
            return new StoreModel(requester);
        }
    }

}());