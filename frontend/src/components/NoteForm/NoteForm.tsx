'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { useEffect, useState } from 'react';
import { useGetNoteQuery } from '@/redux/slice';

type IProps = {
  onSubmit: (data: any, id?: number) => void;
  title: string;
  id?: number;
};

const formSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  content: z.string().min(10, {
    message: 'Title must be at least 10 characters.',
  }),
});

export const NoteForm: React.FC<IProps> = ({ onSubmit, title, id }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  let response: any;
  if (id) {
    response = useGetNoteQuery(id);
  }

  useEffect(() => {
    if (response?.isSuccess) {
      form.setValue('title', response.data.title);
      form.setValue('content', response.data.content);
    }
  }, [response]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data, id && id))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button>{id ? 'Update Note' : 'Add Note'}</Button>
      </form>
    </Form>
  );
};
