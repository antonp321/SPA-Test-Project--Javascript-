var app = app || {};

app.inventoryController = (function() {
    function InventoryController(viewBag, requester) {
        this.viewBag = viewBag;
        this.heroListModel = app.heroesListModel.load(requester);
    }

    InventoryController.prototype.showHeroItems = function(selector, heroId){
        var _this = this;
       return this.heroListModel.getCurrentHeroInfo(heroId)
            .then(function(data){
                var result = {
                    items:[]
                };

                data.items.forEach(function(item){
                    result.items.push({
                        name:item.name,
                        attackPoints: item['attack-points'],
                        defensePoints: item['defense-points'],
                        lifePoints: item['life-points'],
                        type: item.type.name
                    });
                });

                _this.viewBag.showItems(selector, result);
            });
    };

    return {
        load: function (viewBag, requester) {
            return new InventoryController(viewBag, requester);
        }
    }
}());
