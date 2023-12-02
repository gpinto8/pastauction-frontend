import Keycloak from "keycloak-js";

export const initOptions = {
  url: import.meta.env.VITE_KEYCLOAK_IDP as string,
  realm: import.meta.env.VITE_REALM_NAME as string,
  clientId: import.meta.env.VITE_CLIENT_ID as string,
};
// https://keycloak.discourse.group/t/keycloak-direct-reset-password-url/17690
export const createPasswordResetLink = (redirectUri: string) =>
  [
    // Create url
    [initOptions.url, "realms", initOptions.realm].join("/"),
    // Create query
    Object.entries({
      redirect_uri: encodeURIComponent(redirectUri),
      response_type: "code",
      scope: "openid",
      kc_action: "UPDATE_PASSWORD",
    })
      .map((arr) => arr.join("="))
      .join("&"),
      // Merge them
  ].join("?");

export const keycloak = new Keycloak(initOptions);
