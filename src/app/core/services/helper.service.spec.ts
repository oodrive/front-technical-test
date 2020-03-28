import { TestBed } from '@angular/core/testing';
import { Helper } from './helper.service';

describe('[Service] Helper', () => {

	// helper service for tracing all logs in the console
	let helper: Helper;

	/**
     * call before each running test
     */
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [Helper],
		});

		helper = TestBed.get(Helper);
	});

	/**
	* @Test : If service was created
	*/
	it('Should be created', () => {
		// Assert
		expect(helper).toBeTruthy();
	});

	/**
	 * @Test : if service log without errors
	 */
	it('should log without errors', (() => {
		// Assert
		expect(helper).toBeDefined();
		expect(helper.trace('This is a log')).toBeUndefined();
	}));

	/**
	 * @Test : if service log errors
	 */
	it('should log errors', (() => {
		// Assert
		expect(helper).toBeDefined();
		expect(helper.traceError('This is an error')).toBeUndefined();
	}));

	/**
	 * @Test : if service log log with css style
	 */
	it('should trace log with css style', (() => {
		// Assert
		expect(helper).toBeDefined();
		expect(helper.traceWithStyle('This is a log with css style')).toBeUndefined();
	}));
});
