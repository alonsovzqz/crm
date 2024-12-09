import { useForm } from "@refinedev/react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HttpError } from "@refinedev/core";

type CompanyFormProps = {
  type: "create" | "edit";
  id?: string;
};

export function CompanyForm({ type, id }: CompanyFormProps) {
  const form = useForm<Company, HttpError>({
    refineCoreProps: {
      resource: "companies",
      id,
      action: type,
    },
    defaultValues: {
      name: "",
      created_at: new Date().toISOString(),
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
          rules={{ required: "Company name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4" disabled={formLoading}>
          {type === "create" ? "Create" : "Update"} Company
        </Button>
      </form>
    </Form>
  );
}
