import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useFetch from "use-http";
import { auth0ApiUrl } from "config";

export default function Auth0UserMetadata() {
  const { user, getAccessTokenSilently } = useAuth0();

  const path = `${auth0ApiUrl}/users/${user.sub}`;
  const options = {
    interceptors: {
      request: async ({ options }) => {
        const token = await getAccessTokenSilently({
          scope: "read:current_user",
        });

        options.headers.Authorization = `Bearer ${token}`;
        return options;
      },
    },
  };

  const { data, loading, error } = useFetch(path, options, []);

  if (error) {
    return "Error!";
  }

  if (loading) {
    return "Loading...";
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
