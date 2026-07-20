import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";

const entitySchema = z.object({
  name: z.string().min(2, "Name is required"),
  detail: z.string().min(3, "Detail is required"),
  notes: z.string().optional(),
});

type EntityForm = z.infer<typeof entitySchema>;

export function EntityFormDialog({
  title,
  description,
  triggerLabel,
}: {
  title: string;
  description: string;
  triggerLabel: string;
}) {
  const { notify } = useToast();
  const form = useForm<EntityForm>({
    resolver: zodResolver(entitySchema),
    defaultValues: { name: "", detail: "", notes: "" },
  });

  function submit(values: EntityForm) {
    notify({
      title: `${title} saved`,
      description: `${values.name} was added to dummy data for this UI session.`,
    });
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-black">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={form.handleSubmit(submit)}>
          <label className="grid gap-2 text-sm font-bold">
            Name
            <Input {...form.register("name")} placeholder="Enter name" />
            {form.formState.errors.name ? (
              <span className="text-xs text-destructive">{form.formState.errors.name.message}</span>
            ) : null}
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Detail
            <Input {...form.register("detail")} placeholder="Primary detail" />
            {form.formState.errors.detail ? (
              <span className="text-xs text-destructive">{form.formState.errors.detail.message}</span>
            ) : null}
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Notes
            <Textarea {...form.register("notes")} placeholder="Optional notes" />
          </label>
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
