export default class MenuLayout {
	constructor (menuLayoutObj) {
		return MenuLayout.compile(menuLayoutObj);
	}

	static compile (menuLayout = {}) {
		if (!menuLayout.id) throw new MenuLayoutCompileError();
		
		return menuLayout;
	}
}

class MenuLayoutCompileError extends TypeError {
	constructor () {
		super("The format of provided object doesn't match that of MenuLayout");
	}

	get name () { return "MenuLayoutCompileError" }
}



/**
 * @typedef {Object} MenuLayout
 * @prop {String} id
 * @prop {String} left
 * @prop {String} right
 * @prop {String} top
 * @prop {String} bottom
 * @prop {Array<MenuItem>} items
 * @prop {Boolean} hasBackButton
 */

/**
 * @typedef {MenuPagination} MenuItem
 */

/**
 * @typedef {Object} MenuPagination
 * @prop {"pagination"} type
 * @prop {Object} value
 * @prop {String} value.message
 * @prop {String} value.to
 * @prop {Boolean} value.disabled
 */