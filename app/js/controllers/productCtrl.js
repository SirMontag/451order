four51.app.controller('LineItemEditCtrl', function ($routeParams, $scope, ProductService,ProductDisplayService, OrderService, VariantService, $451, UserService) {
	$scope.LineItem = {};
	var user = UserService.get();
	OrderService.get(user.CurrentOrderID, function(data){
		$scope.LineItem = data.LineItems[$routeParams.lineItemIndex];
		$scope.LineItem.Product = ProductService.get({interopID: $scope.LineItem.Product.InteropID}, function(data){
			ProductDisplayService.setProductViewScope($scope);
		});
		$scope.allowAddToOrder = true;
	});
});

four51.app.controller('shortProductViewCtrl', function ($routeParams, $scope, ProductService,ProductDisplayService, OrderService, VariantService, $451) {
	$scope.LineItem = {};
	$scope.LineItem.Product = $scope.p;
	ProductDisplayService.setNewLineItemScope($scope);
	ProductDisplayService.setProductViewScope($scope);
	$scope.allowAddToOrderInProductList = $scope.allowAddToOrder && $scope.LineItem.Specs.length == 0 && $scope.LineItem.Product.Type != 'VariableText';
});

four51.app.controller('ProductCtrl', function ($routeParams, $scope, ProductService,ProductDisplayService, OrderService, VariantService, $451) {
	$scope.LineItem = {};
	$scope.LineItem.Product = ProductService.get({interopID: $routeParams.productInteropID}, function(data){
        var v = null;
        if($routeParams.variantInteropID){
			//Product.Variants doesn't return all details on variable text products, so go back for the rest.
			$scope.LineItem.Variant = data.Type == 'VariableText' ?
				VariantService.get({VariantInteropID: $routeParams.variantInteropID, ProductInteropID: data.InteropID }) :
				$451.filter(data.Variants, {Property: 'InteropID', Value: $routeParams.variantInteropID})[0];

		}
		ProductDisplayService.setNewLineItemScope($scope);
		ProductDisplayService.setProductViewScope($scope);
		$scope.$broadcast('ProductGetComplete');
	});

	$scope.addToOrder = function(quantity, productInteropID, variantInteropID){
		OrderService.addToOrder(quantity, productInteropID, variantInteropID);
	}
});

four51.app.controller('CustomProductCtrlMatrix', function($scope,$451){

	$scope.matrixLineTotal = 0;
	$scope.addMatrixToOrder = function(){

	};

	$scope.$on('ProductGetComplete', function(){
		var specs = $451.filter($scope.LineItem.Product.Specs, {Property: 'DefinesVariant', Value: true});
		$scope.matrixSpec1 = specs[0];
		$scope.matrixSpec2 = specs[1];
	});

});
