const prefixUrl = 'http://localhost:8080/api';

export const environment = {

	items_api_url: `${prefixUrl}/items`,
	items_api_backend_type: 'javascript',

  /** is a production environment or not */
	production: true,

  /** Environment platform name */
	name: 'Prod',

  /** Activate Logs - disabled in prod env*/
	log: false,
};
