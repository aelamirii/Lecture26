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
    templateUrl: 'listItem.html'
  };
  return doo;
};


function ListItemDescription() {
  var doo = {
    template: '{{ item.quantity }} of {{ item.name }}'
  };
  return doo;
};



ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {

  var list1 = this;

  var factory = ShoppingListFactory();

  list1.ItemName = "";
  list1.ItemQuantity = "";



  list1.addItem = function () {
    try {
      factory.addItem(list1.ItemName, list1.ItemQuantity);
    } catch (e) {
      list1.errorMessage = e.message;
    } finally {

    }

  };

  list1.getItems = factory.getItems();

  list1.RemoveItem = function (indexItem) {
    factory.RemoveItem(indexItem);
    list1.errorMessage = "";
  };


};







ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {

  var list2 = this;

  var factory = ShoppingListFactory(3);

  list2.ItemName = "";
  list2.ItemQuantity = "";



  list2.addItem = function () {
    try {
    factory.addItem(list2.ItemName, list2.ItemQuantity);
    } catch (e) {
      list2.errorMessage = e.message;
    } finally {

    }

  };

  list2.getItems = factory.getItems();

  list2.RemoveItem = function (indexItem) {
    factory.RemoveItem(indexItem);
    list2.errorMessage = "";
  };


};






function ShoppingList_Service(maxItems) {

  var service = this;

  var Items = [];

  service.addItem = function (itemName, itemQuantity) {


    if( ( maxItems === undefined ) ||
        ( maxItems !== undefined && Items.length < maxItems)
    )
    {

      var item = {
        name: itemName,
        quantity: itemQuantity
      };

      Items.push(item);

    }
    else {
      throw new Error("Max items "+ maxItems +" was reached.");
    }

  };

  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice( indexItem, 1 );
  };

};



function ShoppingListFactory() {

  var factory = function (maxItems) {
    return new ShoppingList_Service(maxItems);
  }
  return factory;
};




})();
