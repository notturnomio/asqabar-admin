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
import ImageUpload from '@/components/ui/imageUpload';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Banner } from '@prisma/client';
import axios from 'axios';
import { Settings, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  label: z.string().min(3).max(64),
  imageUrl: z.string().url(),
});

type BannerFormValues = z.infer<typeof formSchema>;

interface BannerFormProps {
  initialData: Banner | null;
}

export const BannerForm: React.FC<BannerFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Banner' : 'New Banner';
  const description = initialData ? 'Edit your banner' : 'Create a new banner';
  const toastMessage = initialData ? 'Banner updated' : 'Banner created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (data: BannerFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/banners/${params.bannerId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/banners`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/banners`);
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
      await axios.delete(`/api/${params.storeId}/banners/${params.bannerId}}`);
      router.refresh();
      router.push('/');
      toast.success('Banner deleted');
    } catch (error) {
      toast.error('Make sure you have no categories using this banner');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} icon={<Settings />} />
        {initialData && (
          <Button
            disabled={loading}
            variant='destructive'
            size='sm'
            onClick={() => setOpen(true)}
          >
            <Trash className='mr-2 h-4 w-4' />
            Delete store
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className='space-y-8 w-full'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name='imageUrl'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              name='label'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Banner label'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
      <Separator />
    </>
  );
};
