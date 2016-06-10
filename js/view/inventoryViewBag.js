var app = app || {};

app.inventoryViewBag = (function(){

    function showItems(selector, data){
        $.get('templates/inventory.html', function(templ) {
            $.get('templates/menu-home.html', function (temp) {
                var renderedData = Mustache.render(templ, data);
                $(selector).html(temp + renderedData);

                $('#logoutButton').on('click', function(){

                    Sammy(function(){
                        this.trigger('logout');
                    })
                });
            });
        });
    }

    return {
        load: function() {
            return {
                showItems:showItems
            }
        }
    }
}());
