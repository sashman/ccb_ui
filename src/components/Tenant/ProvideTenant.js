// Hook (use-auth.js)
import React, { useState, useContext, createContext } from "react";
import PropTypes from "prop-types";
import { auth0ApiUrl } from "config";
import useFetch from "use-http";
import tenants from "helpers/tenants";

const tenantContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideTenant({ children }) {
  const provideTenant = useProvideTenant();
  return (
    <tenantContext.Provider value={provideTenant}>
      {children}
    </tenantContext.Provider>
  );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useTenant = () => {
  return useContext(tenantContext);
};

function useProvideTenant() {
  const { user, getAccessTokenSilently } = {};
  const [tenantCache, setTenantCache] = useState(null);

  const { patch, get } = useFetch(auth0ApiUrl, {
    headers: { "Content-Type": "application/json" },
    interceptors: {
      request: async ({ options }) => {
        const token = await getAccessTokenSilently({
          scope: "update:current_user read:current_user",
        });

        options.headers.Authorization = `Bearer ${token}`;
        return options;
      },
    },
  });

  const getRemoteTenant = async () => {
    const path = `users/${user.sub}`;

    const data = await get(path);

    return data["user_metadata"]["tenant"];
  };

  const getTenant = () => tenantCache;

  const setRemoteTenant = async (name) => {
    const path = `users/${user.sub}`;

    const response = await patch(path, {
      user_metadata: { tenant: name },
    });

    setTenantCache(response.user_metadata.tenant);
  };

  return {
    getRemoteTenant,
    getTenant,
    setRemoteTenant,
    tenant: tenantCache || tenants.getTenantFromUser(user),
  };
}
ProvideTenant.propTypes = {
  children: PropTypes.element.isRequired,
};
