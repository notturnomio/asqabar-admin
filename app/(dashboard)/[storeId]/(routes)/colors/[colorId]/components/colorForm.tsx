'use client';

import { AlertModal } from '@/components/modals/alertModal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Color } from '@prisma/client';
import axios from 'axios';
import { Edit, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(3).max(64),
  value: z
    .string()
    .min(4)
    .regex(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      'String must be a valid hex color'
    ),
});

type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps {
  initialData: Color | null;
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const title = initialData ? 'Edit Color' : 'New Color';
  const description = initialData ? 'Edit your color' : 'Create a new color';
  const toastMessage = initialData ? 'Color updated' : 'Color created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success('Color deleted');
    } catch (error) {
      toast.error('Make sure you have no products using this color');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} icon={<Edit />} />
        {initialData && (
          <Button
            disabled={loading}
            variant='destructive'
            color='sm'
            onClick={() => setOpen(true)}
          >
            <Trash className='mr-2 h-4 w-4' />
            Delete color
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className='space-y-8 w-full'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Color name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='value'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-x-4'>
                      <div
                        title='Pick color'
                        className='flex shrink-0 h-8 w-8 rounded-full items-center justify-center border overflow-hidden relative'
                      >
                        <input
                          className='absolute h-10 w-10 border-none border-0'
                          style={{
                            backgroundColor: field.value,
                          }}
                          type='color'
                          disabled={loading}
                          {...field}
                        />
                      </div>
                      <Input
                        disabled={loading}
                        placeholder='Color value'
                        {...field}
                      />
                      {/* <div
                        className='border p-4 rounded-full'
                        style={{ backgroundColor: field.value }}
                      /> */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              name='value'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <input
                      className='border p-4 rounded-full h-6 w-6'
                      style={{ backgroundColor: field.value }}
                      type='color'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <Button
            disabled={loading}
            className='ml-auto'
            variant='default'
            type='submit'
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
