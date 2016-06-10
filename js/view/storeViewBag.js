var app = app || {};

app.storeViewBag = (function(){

    function showStore(selector, data){
        $.get('templates/store.html', function(templ) {
            $.get('templates/menu-home.html', function (temp) {
                var renderedData = Mustache.render(templ, data);
                $(selector).html(temp + renderedData);

                $('#logoutButton').on('click', function(){

                    Sammy(function(){
                        this.trigger('logout');
                    })
                });

                $(".buy").on('click', function(){
                    var itemId = $(this).attr("data-id");
                    var itemType = $(this).attr("data-type");

                    Sammy(function(){
                        this.trigger('getItemId',{
                            itemRef: {
                                "_type" : "KinveyRef",
                                "_id" : itemId,
                                "_collection" : "items"
                            },
                            itemType: itemType
                        });
                    })
                })
            });
        });
    }

    return {
        load: function() {
            return {
                showStore:showStore
            }
        }
    }
}());