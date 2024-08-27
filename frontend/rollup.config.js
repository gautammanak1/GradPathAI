// rollup.config.js
import { fileURLToPath } from 'node:url';
const externalId = fileURLToPath(
	new URL(
		'src/some-local-file-that-should-not-be-bundled.js',
		import.meta.url
	)
);

export default {
	//...,
	external: [externalId],
	output: {
		format: 'iife',
		name: 'MyBundle',
		globals: {
			[externalId]: 'globalVariable'
		}
	}
};