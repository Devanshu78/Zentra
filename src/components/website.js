export const ALL_SITE = [
    {
      title: 'StatementSync',
      description: 'Automated bank statement synchronization',
      icon: '🏦',
      BASE_URL1: `${import.meta.env.VITE_BASE_URL_StatementSync}/login`,
      BASE_URL2: `${import.meta.env.VITE_BASE_URL_StatementSync}/set-token`,
      REDIRECT_URL: `${import.meta.env.VITE_REDIRECT_URL_StatementSync}/records`,
    },
    {
      title: 'PhotoFlow',
      description: 'Smart photo management and processing',
      icon: '📸',
      BASE_URL1: `${import.meta.env.VITE_BASE_URL_PhotoFlow}`,
      BASE_URL2: `${import.meta.env.VITE_BASE_URL_PhotoFlow}`,
      REDIRECT_URL: `${import.meta.env.VITE_REDIRECT_URL_PhotoFlow}`,
    },
  ];