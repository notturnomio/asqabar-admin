'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useEffect, useState } from 'react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title='Are you sure?'
      description='This action cannot be undone.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex justify-end items-center space-x-2 pt-6 w-full'>
        <Button variant='outline' onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant='destructive' onClick={onConfirm} disabled={loading}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
