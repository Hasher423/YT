import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageLoader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [searchKey, setSearchKey] = useState(location.search); // query string
  

  useEffect(() => {
    if (location.search !== searchKey) {
      setSearchKey(location.search);
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 200);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return loading ? (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999] bg-red-600 animate-pulse"></div>
  ) : null;
};

export default PageLoader;
