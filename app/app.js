
(function () {
  'use strict';
  angular.module('ng-slide-down', []).directive('ngSlideDown', [
    '$timeout',
    function ($timeout) {
      var getTemplate, link;
      getTemplate = function (tElement, tAttrs) {
        if (tAttrs.lazyRender !== void 0) {
          return '<div ng-if=\'lazyRender\' ng-transclude></div>';
        } else {
          return '<div ng-transclude></div>';
        }
      };
      link = function (scope, element, attrs, ctrl, transclude) {
        var closePromise, duration, elementScope, emitOnClose, getHeight, hide, lazyRender, onClose, show;
        duration = attrs.duration || 1;
        elementScope = element.scope();
        emitOnClose = attrs.emitOnClose;
        onClose = attrs.onClose;
        lazyRender = attrs.lazyRender !== void 0;
        if (lazyRender) {
          scope.lazyRender = scope.expanded;
        }
        closePromise = null;
        element.css({
          overflow: 'hidden',
          transitionProperty: 'height',
          transitionDuration: '' + duration + 's',
          transitionTimingFunction: 'ease-in-out'
        });
        getHeight = function (passedScope) {
          var c, children, height, _i, _len;
          height = 0;
          children = element.children();
          for (_i = 0, _len = children.length; _i < _len; _i++) {
            c = children[_i];
            height += c.clientHeight;
          }
          return '' + height + 'px';
        };
        show = function () {
          if (closePromise) {
            $timeout.cancel(closePromise);
          }
          if (lazyRender) {
            scope.lazyRender = true;
          }
          return element.css('height', getHeight());
        };
        hide = function () {
          element.css('height', '0px');
          if (emitOnClose || onClose || lazyRender) {
            return closePromise = $timeout(function () {
              if (emitOnClose) {
                scope.$emit(emitOnClose, {});
              }
              if (onClose) {
                elementScope.$eval(onClose);
              }
              if (lazyRender) {
                return scope.lazyRender = false;
              }
            }, duration * 1000);
          }
        };
        scope.$watch('expanded', function (value, oldValue) {
          if (value) {
            return $timeout(show);
          } else {
            return $timeout(hide);
          }
        });
        return scope.$watch(getHeight, function (value, oldValue) {
          if (scope.expanded && value !== oldValue) {
            return $timeout(show);
          }
        });
      };
      return {
        restrict: 'A',
        scope: { expanded: '=ngSlideDown' },
        transclude: true,
        link: link,
        template: function (tElement, tAttrs) {
          return getTemplate(tElement, tAttrs);
        }
      };
    }
  ]);
})();

(function() {
	'use strict';
	// Declare app level module which depends on views, and components
	angular.module('myApp', [
      'ngRoute',
      'myApp.view1',
      'myApp.view2',
      'myApp.version',
      'ngMaterial',
      'ngAnimate',
      'ng-slide-down'
      ])
   .controller('SideNavController', function($scope, $mdSidenav) {
     $scope.openLeftMenu = function() {
       $mdSidenav('left').toggle();
     };
     $scope.leftNavList = leftNav;
   })
   .controller('TopMenuController', function($scope, $window) {
     $scope.topMenuList = topMenu;
     $scope.showSearchField = false;
     $scope.showSearchFieldMobile = false;
     $scope.openSearchField = function(){
         if($window.innerWidth < 600){
             $scope.showSearchFieldMobile = !$scope.showSearchFieldMobile;
         }
         $scope.showSearchField = !$scope.showSearchField;

     }
   })
   .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
   }])
   .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryColor('amber')
    .accentColor('amber');
   });
})();


var topMenu = [
   {"id": "topMenuHome","Name": "HOME"},
   {"id": "topMenuPersonal","Name": "PERSONAL"},
   {"id": "topMenuBusiness","Name": "BUSINESS"},
   {"id": "topMenuRural","Name": "RURAL"},
   {"id": "topMenuSucceedOn","Name": "SUCCEED ON"}
];

var leftNav = [
   {"id": "leftNavPersonal","Name": "PERSONAL", "SubMenu" : [
      { "SubMenuName":"Accounts" },
      { "SubMenuName":"Home Loans" },
      { "SubMenuName":"Credit Cards" },
      { "SubMenuName":"Personal Loans" },
      { "SubMenuName":"Private Banking" },
      { "SubMenuName":"Rates & Fees" }]},
   {"id": "leftNavBusiness","Name": "BUSINESS", "SubMenu" : [
      { "SubMenuName":"Accounts & Services" },
      { "SubMenuName":"Loans & Finance" },
      { "SubMenuName":"Investments" },
      { "SubMenuName":"Professional Services" },
      { "SubMenuName":"Rates & Fees" }]},
   {"id": "leftNavRural","Name": "RURAL", "SubMenu" : [
      { "SubMenuName":"Accounts & Services" },
      { "SubMenuName":"Loans" },
      { "SubMenuName":"Credit Cards" },
      { "SubMenuName":"Insurance" },
      { "SubMenuName":"Rates & Fees" }]},
   {"id": "leftNavContactUs","Name": "CONTACT US", "SubMenu" : [
      { "SubMenuName":"Go to Help page" },
      { "SubMenuName":"0800 803 804" },
      { "SubMenuName":"Find a branch or ATM" },
      { "SubMenuName":"Email an Enquiry" },
      { "SubMenuName":"Feedback" }]},
   {"id": "leftNavAbout","Name": "ABOUT", "SubMenu" : [
      { "SubMenuName":"Carrers at ASB" },
      { "SubMenuName":"ASB Awards" },
      { "SubMenuName":"ASB Reports" },
      { "SubMenuName":"Community" },
      { "SubMenuName":"ASB APIs" }]},
   {"id": "leftNavCalculator","Name": "CALCULATORS", "SubMenu" : [
      { "SubMenuName":"Foreign Exchange" },
      { "SubMenuName":"Buying a home" },
      { "SubMenuName":"Home loan top-up" },
      { "SubMenuName":"Personal Loan" },
      { "SubMenuName":"Savings Calculators" }]},
   {"id": "leftNavInternetBanking","Name": "INTERNET BANKING", "SubMenu" : [
      { "SubMenuName":"About FastNet Classic" },
      { "SubMenuName":"FastNet Business" },
      { "SubMenuName":"FastPay" },
      { "SubMenuName":"Sharetrading" }]},
];

var leftSubNav = [
   {"id": "leftNavPersonal","Name": "Accounts"},
   {"id": "leftNavPersonal","Name": "Home Loans"},
   {"id": "leftNavPersonal","Name": "Credit Cards"},
   {"id": "leftNavPersonal","Name": "Personal Loans"},
   {"id": "leftNavPersonal","Name": "Private Banking"},
   {"id": "leftNavPersonal","Name": "Rates & Fees"},
   {"id": "leftNavBusiness","Name": "Accounts & Services"},
   {"id": "leftNavBusiness","Name": "Loans & Finances"},
   {"id": "leftNavBusiness","Name": "BUSINESS"},
   {"id": "leftNavBusiness","Name": "BUSINESS"},
   {"id": "leftNavBusiness","Name": "BUSINESS"}
];

