/**
 *  Class decorator that can be applied to classes for unsubscribe
 * from all the subscriptions in any component automatically
 */
export function AutoUnsubscribe() {
	return function (constructor: any) {
		const orig = constructor.prototype.ngOnDestroy;
		constructor.prototype.ngOnDestroy = function () {
			// tslint:disable-next-line: forin
			for (const prop in this) {
				const property = this[prop];
				if (typeof property.subscribe === 'function') {
					console.log('unsubscribe from all subscriptions');
					property.unsubscribe();
				}
			}
			orig.apply();
		};
	};
}
