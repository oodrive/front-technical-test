// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const prefixUrl = 'http://localhost:8080/api';

export const environment = {

	files_api_url: `${prefixUrl}/items`,
	files_api_backend_type: 'javascript',

  /** used to know if it is a production environment or not */
	production: false,

  /** Environment platform name */
	name: 'dev',

  /** Activate Logs */
	log: 'true',
};
