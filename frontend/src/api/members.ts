import { api } from "../config/api";
import { errorHandler } from "../lib/error-handler";
import { Member } from "../types/member";

export interface CreateMember {
  title: Member["title"];
  name: Member["name"];
  age: Member["age"];
  email: Member["email"];
  mobile_number: Member["mobile_number"];
  status: Member["status"];
}
export const createMember = async (payload: CreateMember) => {
  try {
    const response = await api.post<Member>("/members", payload);
    return response.data;
  } catch (error) {
    const message = errorHandler(error);
    throw new Error(message);
  }
};

export const getMembers = async () => {
  try {
    const response = await api.get<Member[]>("/members");
    return response.data;
  } catch (error) {
    const message = errorHandler(error);
    throw new Error(message);
  }
};

export const getMember = async (id: number) => {
  try {
    const response = await api.get<Member>(`/members/${id}`);
    return response.data;
  } catch (error) {
    const message = errorHandler(error);
    throw new Error(message);
  }
};

export const updateMember = async (id: number, payload: Partial<Member>) => {
  try {
    const response = await api.put<Member>(`/members/${id}`, payload);
    return response.data;
  } catch (error) {
    const message = errorHandler(error);
    throw new Error(message);
  }
};

export const deleteMember = async (id: number) => {
  try {
    const response = await api.delete<Member>(`/members/${id}`);
    return response.data;
  } catch (error) {
    const message = errorHandler(error);
    throw new Error(message);
  }
};

export interface ReorderMembers {
  status: Member["status"];
  memberId: number;
  topMemberId: number | null;
  bottomMemberId: number | null;
}

export const reorderMembers = async ({
  memberId,
  ...payload
}: ReorderMembers) => {
  try {
    const response = await api.put<Member>(
      `/members/reorder/${memberId}`,
      payload
    );
    return response.data;
  } catch (error) {
    const message = errorHandler(error);
    throw new Error(message);
  }
};
