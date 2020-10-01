(function () {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('listItemDescription', ListItemDescription)
.directive('listItem', ListItem)
;


function ListItem() {

  var doo = {
    templateUrl: 'listItem1.html'
  };
  return doo;
}



function ListItemDescription() {

  var doo = {
    template: '{{ item.quantity }} of {{ item.name }}'
  };;

  return doo;
};


//  Shopping List 1 with undefined Max Items
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {

  var list = this;

  var ShoppingList = ShoppingListFactory();

  list.ItemName = "";
  list.ItemQuantity = "";


  list.addItem = function () {

    try {
      ShoppingList.addItem(list.ItemName, list.ItemQuantity);
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }

  };

  list.getItems = ShoppingList.getItems();

  list.RemoveItem = function (indexItem) {
    ShoppingList.RemoveItem(indexItem);
    list.errorMessage = "";
  };


};


//  Shopping List 2 with limited Max items
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {

  var list = this;

  var ShoppingList = ShoppingListFactory(3);

  list.ItemName = "";
  list.ItemQuantity = "";

  list.addItem = function () {

    try {
      ShoppingList.addItem(list.ItemName, list.ItemQuantity);
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }

  };


  list.getItems = ShoppingList.getItems();

  list.RemoveItem = function (indexItem) {
    ShoppingList.RemoveItem(indexItem);
    list.errorMessage = "";
  };

};









function ShoppingListService(maxItems) {

  var service = this;

  var Items = [];

  service.addItem = function (itemName, itemQuantity) {

    if( ( maxItems === undefined ) ||
        ( maxItems !== undefined && Items.length < maxItems )
    )
    {

      var item = {
        name: itemName,
        quantity: itemQuantity
      };

      Items.push(item);
    }
    else {
      throw new Error("Max Items ( "+ maxItems +" ) was reached");
    }

  };


  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice( indexItem , 1  );
  };

};



function ShoppingListFactory() {

  var factory = function (maxItems) {
      return new ShoppingListService(maxItems);
  };

  return factory;
};





})();
