'use client';

import { useStoreModal } from '@/hooks/useStoreModal';
import { useEffect } from 'react';

const RootPage = () => {
  // const [isClient, setIsClient] = useState(false);
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    // setIsClient(true);
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default RootPage;
