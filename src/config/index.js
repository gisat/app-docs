/**
 * CONFIG LOGIC - NOT FOR CONFIGURATION VALUES
 */

import _ from 'lodash';

/**
 * DEFAULT VALUES (fallback)
 * Used if not specified in rewrites.
 */
import {configDefaults} from '@gisatcz/ptr-core';
/**
 * CONFIG PROPER
 * Per-instance values, development values & features.
 */
import rewrites from './rewrites';

let config = _.merge({}, configDefaults, rewrites);
export default config;
