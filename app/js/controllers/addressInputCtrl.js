'use strict';

four51.app.controller('AddressInputCtrl', function ($scope, $location, $451, $routeParams, AddressService, ResourcesService, UserService) {
    // set default value to US is it's a new address and other values
    $scope.address.Country = $scope.address.Country || 'US';
    $scope.address.IsBilling = $scope.address.IsBilling || true;
    $scope.address.IsShipping = $scope.address.IsShipping || true;

    $scope.save = function() {
        AddressService.save(this.address, function() {
            $location.path($scope.return);
        });
    };
    $scope.delete = function() {
        AddressService.delete(this.address, function() {
            $location.path($scope.return);
        });
    };
    $scope.countries = ResourcesService.countries;
    $scope.states = ResourcesService.states;

    $scope.country = function(item) {
        return $scope.address != null ? $scope.address.Country == item.country : false;
    };
    $scope.hasStates = function() {
        return $scope.address != null ? $scope.address.Country == 'US' || $scope.address.Country == 'CA' || $scope.address.Country == 'NL' : false;
    };

    $scope.isPhoneRequired = function() {
        return (UserService.permissions.contains('BillingAddressPhoneRequired') && $scope.address.IsBilling) ||
            (UserService.permissions.contains('ShipAddressPhoneRequired') && $scope.address.IsShipping);
    }
});
