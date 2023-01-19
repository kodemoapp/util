// https://usehooks-ts.com/react-hook/use-ssr
export const useIsSsr = () => {
  const isDOM = typeof window !== 'undefined' && window.document && window.document.documentElement;

  return !isDOM;
};
