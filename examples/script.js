/* global angular, moment */
angular.module('momentPickerExample', [
  'ui.bootstrap',
  'moment-picker'
  ])
  .config(function (momentPickerProvider) {
    momentPickerProvider.options({
            /* Picker properties */
            format:        'YYYY-MM-DD',
            startView:     'month',
            minView:       'month',
            maxView:       'month',
            autoclose:     true,
            today:         false,
            keyboard:      true,

            /* Extra: Views properties */
            minutesStep:   15,
            hoursFormat:   'h A',
        });
  })
  .filter('moment', function(){
    var thisYear = new moment().year();
    return function(value, format){
      if ( !moment.isMoment(value) ){ return undefined; }
      return value.format(format);
    };
  })
  .directive('timeOnlyMoment', function ($compile) {
    return {
      require: 'ngModel',
      priority: 1,
      terminal: true,
      link: {
        pre: function (scope, element, attrs, ngModelCtrl) {
          element.removeAttr('time-only-moment');
          element.attr('format', 'hh:mm');
          element.attr('header-format', 'hh:mm A');
          element.attr('start-view', 'day');
          element.attr('min-view', 'day');
          element.attr('max-view', 'hour');

          $compile(element)(scope);

          scope.$watch(attrs.ngModel, function (model) {
            if (moment.isMoment(model) && (!model._f || !model.isUTC ) ) {
              model._f = 'hh:mm';
              model.isUTC = true;
            }
          });
        }
      }
    };
  })
  .controller('mainCtrl', function($scope, $modal){
    $scope.fullDate = 'YYYY-MM-DD HH:mm:ss';
    $scope.data = {
      one: new moment(),
      two: null,
      time: new moment()
    };

    $scope.openModal = function(){
      $modal.open({
        scope: $scope,
        templateUrl: '/examples/modal.html'
      });
    };
  });
