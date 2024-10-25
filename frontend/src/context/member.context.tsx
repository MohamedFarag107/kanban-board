import { createContext, useContext, useState } from "react";
import { Member } from "../types/member";

export interface MemberContextType {
  member?: Member;
  setMember: (member: Member) => void;
}

export const MemberContext = createContext<MemberContextType>({
  member: undefined,
  setMember: () => {},
});

export interface MemberProviderProps {
  children: React.ReactNode;
}

export const MemberProvider: React.FC<MemberProviderProps> = ({ children }) => {
  const [member, setMember] = useState<Member | undefined>(undefined);

  return (
    <MemberContext.Provider value={{ member, setMember }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("useMember must be used within a MemberProvider");
  }
  return context;
};
