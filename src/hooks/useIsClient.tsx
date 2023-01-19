import React from 'react';

// https://usehooks-ts.com/react-hook/use-is-client
export const useIsClient = () => {
  const [isClient, setClient] = React.useState(false);

  React.useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
};
