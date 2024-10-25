import { Member } from "../../../types/member";

export interface MemberCardProps {
  member: Member;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <div className="bg-white rounded-md space-y-2 p-3">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl line-clamp-1">
          {member.title}. {member.name}
        </h1>
        <span className="text-gray-500">{member.age} yo</span>
      </div>
      <h4 className="text-start">{member.email}</h4>
      <h4 className="text-start text-gray-500 font-medium">{member.mobile_number}</h4>
    </div>
  );
};
