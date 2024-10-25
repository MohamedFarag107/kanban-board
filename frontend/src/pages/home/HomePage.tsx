import { ScrollableArea } from "../../components/ScrollableArea";
import { Member } from "../../types/member";
import { KanbanBoard } from "./components/KanbanBoard";
import { MemberForm } from "./components/MemberForm";

export const HomePage = () => {
  const onSubmit = (member: Partial<Member>) => {
    console.log(member);
  };
  return (
    <div className="min-h-screen p-5">
      <header className="flex flex-col items-center justify-center text-2xl  mb-8">
        <b>Kanban Board</b>
      </header>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-3">
          <MemberForm onSubmit={onSubmit} />
        </div>
        <ScrollableArea className="col-span-12 lg:col-span-9">
          <KanbanBoard />
        </ScrollableArea>
      </div>
    </div>
  );
};
