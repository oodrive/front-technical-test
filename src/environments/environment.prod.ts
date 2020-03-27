const prefixUrl = 'http://localhost:8080/api';

export const environment = {

	files_api_url: `${prefixUrl}/items`,
	files_api_backend_type: 'javascript',

  /** is a production environment or not */
	production: true,

  /** Environment platform name */
	name: 'Prod',

  /** Activate Logs */
	log: 'true',
};
