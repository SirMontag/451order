'use strict';

/* Directives */

four51.app.directive('authorization', function($route, $451) {
	var obj = {
		restrict: 'A'
	};
	return obj;
});

four51.app.directive('addressinput', function() {
    var obj = {
        restrict: 'E',
        scope: {
            address : '=',
            return: '='
        },
        templateUrl: 'partials/controls/addressInputView.html',
        controller: 'AddressInputCtrl'
    }
    return obj;
});

four51.app.directive('spendingaccounts', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/spendingAccountsView.html'
    }
    return obj;
});

four51.app.directive('orderhistoryheader', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/reporting/orderHistoryHeaderView.html'
    }
    return obj;
});

four51.app.directive('orderhistoryfooter', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/reporting/orderHistoryFooterView.html'
    }
    return obj;
});

four51.app.directive('lineitemhistorygrid', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/reporting/lineItemHistoryGridView.html'
    }
    return obj;
});

// http://stackoverflow.com/questions/13549216/changing-css-on-scrolling-angular-style
four51.app.directive('scrollPosition', function($window) {
    return function(scope, element, attrs) {
        var windowEl = angular.element($window);
        windowEl.on('scroll', function() {
            scope.$apply(function() {
                scope[attrs.scrollPosition] = windowEl.scrollTop();
            });
        });
    };
});