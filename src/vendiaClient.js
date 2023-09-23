import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: `https://72okjdcew5.execute-api.us-west-2.amazonaws.com/graphql/`,
    apiKey: '8tUYKQbL9WRHZeK3F5S626SMH9Mu5tGsGvm1x4S3hitr' // <---- API key
  })

  export const vendiaClient = () => {
    return {client};
  };
  