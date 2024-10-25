import { useMemo } from "react";
import { Status } from "../../../types/board-status";
import { Board } from "./Board";
import { Member } from "../../../types/member";

export interface KanbanBoardProps {
  members: Member[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ members }) => {
  const boards = useMemo(() => {
    return Object.values(Status);
  }, []);

  return (
    <div>
      <div className="flex flex-col w-full text-center">
        <div className="flex flex-row h-full justify-between gap-2">
          {boards.map((status) => (
            <Board
              key={status}
              status={status}
              members={members.filter((member) => member.status === status)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
