import { useMemo } from "react";
import { Status } from "../../../types/board-status";
import { Board } from "./Board";
import { Member } from "../../../types/member";

export const KanbanBoard = () => {
  const boards = useMemo(() => {
    return Object.values(Status);
  }, []);
  const count = {
    [Status.UNCLAIMED]: 12,
    [Status.FIRST_CONTACT]: 11,
    [Status.PREPARING_WORK_OFFER]: 33,
    [Status.SEND_TO_THERAPIST]: 45,
  };

  const members: Member[] = Array.from({ length: 50 }).map((_, index) => ({
    age: 20 + index,
    name: `Mohamed`,
    title: `Mr`,
    email: `mofarag@gmail.com`,
    id: index,
    mobile_number: `+201069980459`,
    order: `order-${index}`,
    status: boards[index % boards.length],
  }));

  return (
    <div>
      <div className="flex flex-col w-full text-center">
        <div className="flex flex-row h-full justify-between gap-2">
          {boards.map((status) => (
            <Board
              key={status}
              status={status}
              count={count[status]}
              members={members.filter((member) => member.status === status)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
