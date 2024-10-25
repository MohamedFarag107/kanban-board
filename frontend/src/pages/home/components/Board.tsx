import { cn } from "../../../lib/utils";
import { Status } from "../../../types/board-status";
import { Member } from "../../../types/member";
import { MemberCard } from "./MemberCard";

export interface BoardProps {
  status: Status;
  count: number;
  members: Member[];
}
export const Board: React.FC<BoardProps> = ({ status, count, members }) => {
  const isUnclaimed = status === Status.UNCLAIMED;
  return (
    <>
      <div
        className={cn(
          "min-w-[350px] w-[350px] rounded-xl border-2  border-[#bad1e0] p-4",
          !isUnclaimed && "bg-[#bad1e0]"
        )}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="font-bold text-lg">{status}</h2>
          <span className="bg-white rounded-full px-3 font-bold">{count}</span>
        </div>
        <div className="space-y-4 min-h-[80vh] h-[80vh] max-h-[80vh] px-4 overflow-y-auto">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
      {isUnclaimed && (
        <div className="h-screen w-[2px] rounded-xl bg-[#0066ac]" />
      )}
    </>
  );
};