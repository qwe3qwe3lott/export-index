// @ts-nocheck
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// eslint-disable-next-line no-undef
declare const self: ServiceWorkerGlobalScope;

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
	({ request, url }: { request: Request; url: URL }) => {
		if (request.mode !== 'navigate') return false;
		if (url.pathname.startsWith('/_')) return false;
		if (url.pathname.match(fileExtensionRegexp)) return false;
		return true;
	},
	createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

registerRoute(
	({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
	new StaleWhileRevalidate({
		cacheName: 'images',
		plugins: [new ExpirationPlugin({ maxEntries: 50 })]
	})
);

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) return response;
			if (event.request.mode === 'navigate') return caches.match('./index.html');
			return fetch(event.request);
		})
	);
});