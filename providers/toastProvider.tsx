'use client';

import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
  return <Toaster />;
};

export default dynamic(() => Promise.resolve(ToasterProvider), { ssr: false });
