"use client";

import { useForm } from "@refinedev/react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HttpError } from "@refinedev/core";

type ContactFormProps = {
  type: "create" | "edit";
  id?: string;
};

export function ContactForm({ type, id }: ContactFormProps) {
  const form = useForm<Contact, HttpError>({
    refineCoreProps: {
      resource: "contacts",
      action: type,
      id,
    },
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const {
    refineCore: { onFinish, formLoading },
    handleSubmit,
    control,
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onFinish)}>
        <FormField
          control={control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone"
          rules={{ required: "Phone is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4" disabled={formLoading}>
          {type === "create" ? "Create" : "Update"} Contact
        </Button>
      </form>
    </Form>
  );
}
