"use strict";

import load from 'express-load'
import path from 'path';

const SCREENS = path.join(__dirname, 'screens');

class Loader {
	static loadData(app){
		load(`${SCREENS}/screenModel`).then(`${SCREENS}/screenRouter`).into(app);

		/*
			For Google Driver, Dropbox, etc...
		 */
		// load(SOCIALS_INTEGRATIONS+'dropbox/models').then(SOCIALS_INTEGRATIONS+'dropbox/controller').then(SOCIALS_INTEGRATIONS+'dropbox/router').into(app);
	}
}

export default Loader;