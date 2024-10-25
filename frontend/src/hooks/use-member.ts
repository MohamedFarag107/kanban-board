import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { QueryKey } from "../types/query-key";
import {
  createMember,
  updateMember,
  deleteMember,
  getMember,
  getMembers,
  reorderMembers,
} from "../api/members";
import { Member } from "../types/member";

export const useCreateMemberMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKey.Members],
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Members],
      });
    },
  });
};

export const useUpdateMemberMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKey.Members, id],
    mutationFn: (payload: Partial<Member>) => updateMember(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Members, id],
      });
    },
  });
};

export const useDeleteMemberMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKey.Members, id],
    mutationFn: () => deleteMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Members, id],
      });
    },
  });
};

export const useReorderMembersMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKey.Members],
    mutationFn: reorderMembers,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Members],
      });
    },
  });
};

export const useGetMemberQuery = (id: number) => {
  return useQuery({
    queryKey: [QueryKey.Members, id],
    queryFn: () => getMember(id),
  });
};

export const useGetMembersQuery = () => {
  return useQuery({
    queryKey: [QueryKey.Members],
    queryFn: getMembers,
  });
};
