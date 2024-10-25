import { useForm } from "react-hook-form";
import { Member } from "../../../types/member";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "../../../types/board-status";
import { Input } from "../../../components/ui/Input";
import { useEffect } from "react";
import { Button } from "../../../components/ui/Button";

export interface MemberFormProps {
  member?: Member;
  onSubmit: (member: Partial<Member>) => void;
}

export const memberSchema = z.object({
  title: z.string().min(1, { message: "Title is too short" }),
  name: z.string().min(1, { message: "Name is too short" }),
  age: z
    .string()
    .transform((v) => +v)
    .refine((v) => !isNaN(v) && v > 0, { message: "Invalid Age" }),
  email: z.string().email(),
  mobile_number: z.string().min(1, { message: "Invalid Phone Number" }),
  status: z.nativeEnum(Status).default(Status.UNCLAIMED),
});

export type MemberFormValues = z.infer<typeof memberSchema>;

export const MemberForm: React.FC<MemberFormProps> = ({ member, onSubmit }) => {
  const form = useForm<MemberFormValues>({
    defaultValues: member,
    resolver: zodResolver(memberSchema),
  });

  useEffect(() => {
    if (member) {
      form.reset(member);
    }
  }, [member]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={"flex flex-col gap-4 w-full"}
    >
      <Input
        {...form.register("title")}
        error={form.formState.errors.title?.message}
        label="title"
        placeholder="Mr"
        type="text"
      />
      <Input
        {...form.register("name")}
        error={form.formState.errors.name?.message}
        label="Name"
        placeholder="Mohamed"
        type="text"
      />
      <Input
        {...form.register("age")}
        error={form.formState.errors.age?.message}
        label="age"
        placeholder="20"
        min={1}
        type="number"
      />
      <Input
        {...form.register("email")}
        error={form.formState.errors.email?.message}
        label="email"
        placeholder="example@gmail.com"
        type="email"
      />

      <Input
        {...form.register("mobile_number")}
        error={form.formState.errors.mobile_number?.message}
        label="mobile number"
        placeholder="+201234567890"
        type="text"
      />

      <Button
        error={Object.keys(form.formState.errors).length > 0}
        type="submit"
      >
        {member ? "Update Member" : "Add Member"}
      </Button>
    </form>
  );
};
