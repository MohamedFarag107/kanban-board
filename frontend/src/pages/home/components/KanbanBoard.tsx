import { Status } from "../../../types/board-status";
import { Board } from "./Board";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Member } from "../../../types/member";

export interface KanbanBoardProps {
  data: Record<Status, Member[]>;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ data }) => {
  const isMobile = window.innerWidth < 600;

  return (
    <div>
      <div className="flex flex-col w-full text-center">
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <div className="flex flex-row h-full justify-between gap-2">
            {Object.entries(data).map(([status, members]) => (
              <Board key={status} status={status as Status} members={members} />
            ))}
          </div>
        </DndProvider>
      </div>
    </div>
  );
};
