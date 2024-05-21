/* eslint-disable no-process-env */

export type Defined = {
  UI__APP_URL?: string;
  SDK__GRAPHQL_API_URL?: string;
};

// WARNING: Those values will be visible in public source code pushed to NPM
export const defined: Defined = {
  UI__APP_URL: process.env.UI__APP_URL,
  SDK__GRAPHQL_API_URL: process.env.SDK__GRAPHQL_API_URL,
};

// The variables are parsed at build time, in order to ensure
// that the override is intentional we should stick
// with the application prefix to avoid unexpected behaviour for
// polluted environments that might have similar env vars
// e.g. FLEEK__UI_APP_URL
const override_env_var_prefix = '';

export const getDefined = (key: keyof typeof defined) => process.env[`${override_env_var_prefix}${key}`] || defined[key];
