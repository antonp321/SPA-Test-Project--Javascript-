var app = app || {};

app.heroesListModel = (function(){
    function HeroesListModel(requester){
        this.requester = requester;
    }

    HeroesListModel.prototype.getUsersHeroes = function(userId) {
        var appId = this.requester.appId;
        var theUrl = 'https://baas.kinvey.com/appdata/'+ appId + '/heroes/?query={"_acl.creator":"'+ userId + '"}&resolve=class&retainReferences=false';
        return this.requester.get(theUrl, true);
    };

    HeroesListModel.prototype.addNewHero = function(data){
        var appId = this.requester.appId;
        var theUrl = 'https://baas.kinvey.com/appdata/'+ appId + '/heroes/';
        return this.requester.post(theUrl, true, data);
    };

    // HeroesListModel.prototype.getItems = function (id) {
    //     var appId = this.requester.appId;
    //     var requestUrl = 'https://baas.kinvey.com/appdata/'+ appId + '/heroes/' + id + "?resolve=items,items.type&retainReferences=false";
    //     return this.requester.get(requestUrl, true).then(function (data) {
    //         if (data.items != undefined) {
    //             return data.items.map(function (item) {
    //                 return {
    //                     id: item._id,
    //                     name: item.name,
    //                     type: item.type.name
    //                 }
    //             });
    //         } else {
    //             return [];
    //         }
    //     });
    // };

    HeroesListModel.prototype.getCurrentHeroInfo = function(heroId) {
        var appId = this.requester.appId;
        var theUrl = 'https://baas.kinvey.com/appdata/' + appId + '/heroes/' + heroId + '?resolve=class,items,items.type&retainReferences=false';
        return this.requester.get(theUrl, true);
    };

    HeroesListModel.prototype.removeItem = function (heroId, itemId) {
        var _this = this;
        var appId = this.requester.appId;

        return this.getCurrentHeroInfo(heroId).then(function (hero) {

            console.log(hero);
            for(var i = 0; i < hero.items.length; i++){
                if(hero.items[i]._id === itemId){
                    hero.items.splice(i, 1);
                }
            }

            console.log(hero);
            var theUrl = 'https://baas.kinvey.com/appdata/'+ appId + '/heroes/' + heroId;
            return _this.requester.put(theUrl, true, hero);
        })
    };

    HeroesListModel.prototype.editHeroPoints = function(heroId, data){
        var appId = this.requester.appId;
        var theUrl = 'https://baas.kinvey.com/appdata/'+ appId + '/heroes/' + heroId;
        return this.requester.put(theUrl, true, data);
    };

    return {
        load: function(requester){
            return new HeroesListModel(requester);
        }
    }
}());