
 'use strict';
 
 module.exports = {
  "extends": [require.resolve('./node_modules/eslint-config-react-app/index.js')],
  "plugins": ["unused-imports"],
  "rules": {
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
		"unused-imports/no-unused-vars": "warn"
  }
}