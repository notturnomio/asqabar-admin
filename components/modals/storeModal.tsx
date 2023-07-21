'use client';

import { Modal } from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/useStoreModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { POST } from '@/app/api/stores/route';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(3).max(64),
});

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', values);
      toast.success('Store created');
      console.log(response.data);
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title='Create store'
      description='Add a new store to manage products and categories'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Type a name for your new store'
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button variant='outline' onClick={onClose} disabled={loading}>
                  Cancel
                </Button>
                <Button type='submit' disabled={loading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
