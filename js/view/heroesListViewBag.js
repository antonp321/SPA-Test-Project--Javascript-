var app = app || {};

app.heroesListViewBag = (function(){

    function loadHeroesList(selector, data){
        $.get('templates/heroes.html', function(templ){
            $.get('templates/menu-home.html', function(temp){
                var renderedData = Mustache.render(templ, data);
                $(selector).html(temp + renderedData);

                $('#logoutButton').on('click', function(){

                    Sammy(function(){
                        this.trigger('logout');
                    })
                });
                //
                // $('.imgClick').on('click', function(){
                //
                //     var getTheId = $(this).attr('href');
                //     var arrHref = getTheId.split('/');
                //     var theId = arrHref[arrHref.length - 1];
                //
                //     Sammy(function(){
                //         this.trigger('getId', {getId:theId});
                //     })
                // });
            });
        });
    }

    function addHeroTempl(selector, data){
        $.get('templates/add-hero.html', function(templ){
            $.get('templates/menu-home.html', function(temp){
                var renderedData = Mustache.render(templ, data);
                $(selector).html(temp + renderedData);

                $('#logoutButton').on('click', function(){

                    Sammy(function(){
                        this.trigger('logout');
                    })
                });

                $('#addHero').on('click', function(){
                    var name = $('#name').val();

                    if($('input[name=class]:checked').attr('id') === "Amazon"){
                        var heroClass = {
                            "_type" : "KinveyRef",
                            "_id" : "574b0dc2f68aa6567a80ee5d",
                            "_collection" : "heroClasses"
                        };

                        var basicArmor = {
                            "_type" : "KinveyRef",
                            "_id" : "575563ac38157d3e54b3fa76",
                            "_collection": "items"
                        };
                    }
                    else{
                        var heroClass = {
                            "_type" : "KinveyRef",
                            "_id" : "574b0db4735b78fb1bdc0ebc",
                            "_collection": "heroClasses"
                        };

                        var basicArmor = {
                            "_type" : "KinveyRef",
                            "_id" : "575563ac38157d3e54b3fa76",
                            "_collection": "items"
                        };
                    }

                    Sammy(function(){
                        this.trigger('addNewHero',{name:name, class: heroClass, items:[basicArmor]});
                    })
                })

            });
        });
    }

    function loadCurrentHeroTempl(selector, data){
        $.get('templates/hero.html', function(templ){
            $.get('templates/menu-home.html', function(temp){
                var renderedData = Mustache.render(templ, data);
                $(selector).html(temp + renderedData);

                $('#logoutButton').on('click', function(){

                    Sammy(function(){
                        this.trigger('logout');
                    })
                });


            })
        })
    }
    

    return {
        load: function() {
            return {
                loadHeroesList: loadHeroesList,
                addHeroTempl: addHeroTempl,
                loadCurrentHeroTempl : loadCurrentHeroTempl
            }
        }
    }
}());