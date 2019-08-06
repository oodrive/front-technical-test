import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { hmrBootstrap } from './hmr';

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule, {
	preserveWhitespaces: true,
});

// @ts-ignore TS2304
if (module.hot) {
	// @ts-ignore TS2304
	hmrBootstrap(module, bootstrap);
} else {
	bootstrap();
}
