import React from "react";
import PropTypes from "prop-types";
import { Provider } from "use-http";
import { useAuth0 } from "@auth0/auth0-react";
import { apiUrl } from "config";
import { useTenant } from "components/Tenant/ProvideTenant";

export default function BackendApiProvider({ children }) {
  const { getIdTokenClaims } = useAuth0();
  const { tenant } = useTenant();

  const options = {
    interceptors: {
      // every time we make an http request, this will run 1st before the request is made
      // url, path and route are supplied to the interceptor
      // request options can be modified and must be returned
      request: async ({ options }) => {
        const claims = await getIdTokenClaims();
        const token = claims.__raw;
        options.headers.Authorization = `Bearer ${token}`;
        return options;
      },
      // every time we make an http request, before getting the response back, this will run
      // response: async ({ response }) => {
      //   const res = response;
      //   if (res.data) res.data = toCamel(res.data);
      //   return res;
      // },
    },
  };

  const url = tenant ? apiUrl.replace(/:\/\//, `://${tenant}.`) : apiUrl;

  return (
    <Provider url={url} options={options}>
      {children}
    </Provider>
  );
}

BackendApiProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
