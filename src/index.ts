import * as angular from 'angular';
import * as uib from 'angular-ui-bootstrap';
import Provider from './provider';
import Directive from './directive';


angular
	.module('moment-picker', ['ui.bootstrap'])
	.provider('momentPicker', [() => new Provider()])
	.directive('momentPicker', [
		'$timeout', '$sce', '$log', '$window', 'momentPicker', '$position', '$compile', '$templateCache',
		($timeout: ng.ITimeoutService, $sce: ng.ISCEService, $log: ng.ILogService, $window: ng.IWindowService, momentPicker: Provider,
		$position: uib.IPositionService, $compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService) => {
			return new Directive($timeout, $sce, $log, $window, momentPicker, $position, $compile, $templateCache);
		}
	]);

export { Provider, Directive };
