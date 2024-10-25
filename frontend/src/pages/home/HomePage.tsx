import toast from "react-hot-toast";
import { CreateMember } from "../../api/members";
import { ApiError } from "../../components/ApiError";
import { Loader } from "../../components/loader";
import { ScrollableArea } from "../../components/ScrollableArea";
import {
  useCreateMemberMutation,
  useGetMembersQuery,
} from "../../hooks/use-member";
import { KanbanBoard } from "./components/KanbanBoard";
import { MemberForm, MemberFormValues } from "./components/MemberForm";
import { UseFormReturn } from "react-hook-form";

export const HomePage = () => {
  const { mutate, isPending: isCreatePending } = useCreateMemberMutation();

  const onSubmit = (
    member: CreateMember,
    form: UseFormReturn<MemberFormValues>
  ) => {
    mutate(member, {
      onError(error) {
        toast.error(error.message);
      },
      onSuccess() {
        form.reset();
        toast.success("Member created successfully");
      },
    });
  };

  const { data = [], isPending, isError, error } = useGetMembersQuery();

  if (isPending) return <Loader fullScreen size={48} />;
  if (isError) return <ApiError error={error} />;

  return (
    <div className="min-h-screen p-5">
      <header className="flex flex-col items-center justify-center text-2xl  mb-8">
        <b>Kanban Board</b>
      </header>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-3">
          <MemberForm onSubmit={onSubmit} isLoading={isCreatePending} />
        </div>
        <ScrollableArea className="col-span-12 lg:col-span-9">
          <KanbanBoard members={data} />
        </ScrollableArea>
      </div>
    </div>
  );
};
