import toast from "react-hot-toast";
import { ApiError } from "../../components/ApiError";
import { Loader } from "../../components/loader";
import { ScrollableArea } from "../../components/ScrollableArea";
import {
  useCreateMemberMutation,
  useGetMembersGroupByStatusQuery,
  useUpdateMemberMutation,
} from "../../hooks/use-member";
import { KanbanBoard } from "./components/KanbanBoard";
import { MemberForm, MemberFormValues } from "./components/MemberForm";
import { UseFormReturn } from "react-hook-form";
import { Modal } from "../../components/ui/Modal";
import { useMember } from "../../context/member.context";

export const HomePage = () => {
  const { open, setOpen, setMember, member } = useMember();
  const { mutate: createMember, isPending: isCreatePending } =
    useCreateMemberMutation();
  const { mutate: updateMember, isPending: isUpdatePending } =
    useUpdateMemberMutation();

  const onCreate = (
    member: MemberFormValues,
    form: UseFormReturn<MemberFormValues>
  ) => {
    createMember(member, {
      onError(error) {
        toast.error(error.message);
      },
      onSuccess() {
        form.reset();
        toast.success("Member created successfully");
      },
    });
  };

  const onUpdate = (
    { age, email, mobile_number, name, title, status }: MemberFormValues,
    form: UseFormReturn<MemberFormValues>
  ) => {
    if (member) {
      updateMember(
        {
          id: member.id,
          payload: { age, email, mobile_number, name, title, status },
        },
        {
          onError(error) {
            toast.error(error.message);
          },
          onSuccess() {
            setOpen(false);
            setMember(undefined);
            toast.success("Member updated successfully");
            form.reset();
          },
        }
      );
    }
  };

  const { data, isPending, isError, error } = useGetMembersGroupByStatusQuery();

  if (isPending) return <Loader fullScreen size={48} />;
  if (isError) return <ApiError error={error} />;

  return (
    <div className="min-h-screen p-5">
      <header
        onClick={() => setOpen(true)}
        className="flex flex-col items-center justify-center text-2xl  mb-8"
      >
        <b>Kanban Board</b>
      </header>
      <Modal
        title="Create Member"
        open={open && !!member}
        onClose={() => setOpen(false)}
      >
        {member ? (
          <MemberForm
            member={member}
            onSubmit={onUpdate}
            isLoading={isUpdatePending}
          />
        ) : null}
      </Modal>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-3">
          <MemberForm onSubmit={onCreate} isLoading={isCreatePending} />
        </div>
        <ScrollableArea className="col-span-12 lg:col-span-9">
          <KanbanBoard data={data} />
        </ScrollableArea>
      </div>
    </div>
  );
};
