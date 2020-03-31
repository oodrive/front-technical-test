/* To change This URI with anotehr public servcer apis because for our example we can't run
the modul api and app in the same server firebase*/
const prefixUrl = 'https://oodrive-files-manager.firebaseapp.com/api';

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
