import { X } from "lucide-react";

import { Member } from "../../../types/member";
import { cn } from "../../../lib/utils";
import { useDeleteMemberMutation } from "../../../hooks/use-member";
import toast from "react-hot-toast";
import { clamp } from "../../../lib/clamp";
import { useMember } from "../../../context/member.context";

export interface MemberCardProps {
  member: Member;
  index: number;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const { mutate, isPending } = useDeleteMemberMutation(member.id);
  const { setOpen, setMember } = useMember();

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    mutate(undefined, {
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  const handleUpdate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setMember(member);
    setOpen(true);
  };

  return (
    <div
      className={cn(
        "bg-white rounded-md space-y-2 p-3 relative group cursor-pointer select-none",
        isPending && "opacity-50 pointer-events-none"
      )}
      onClick={handleUpdate}
    >
      <div
        className={cn(
          "invisible group-hover:visible absolute top-2 right-2 border rounded-full p-1 bg-red-500 text-white border-red-500"
        )}
        onClick={handleDelete}
      >
        <X size={12} />
      </div>
      <div className="flex justify-between items-center">
        <h1
          title={`${member.title}. ${member.name}`}
          className="font-bold text-xl line-clamp-1"
        >
          {clamp(`${member.title}. ${member.name}`, { length: 18 })}
        </h1>
        <span className="text-gray-500 min-w-10">{member.age} yo</span>
      </div>
      <h4 className="text-start">{member.email}</h4>
      <h4 className="text-start text-gray-500 font-medium">
        {member.mobile_number}
      </h4>
    </div>
  );
};
