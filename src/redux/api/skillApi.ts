import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSkill: build.mutation({
      query: (data) => ({
        url: "/skills",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.skills],
    }),

    getAllSkills: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/skills",
          method: "GET",
          params: arg,
        };
      },
      // transformResponse: (response: [], meta: TMeta) => {
      //   return {
      //     projects: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.skills],
    }),
    getSingleSkill: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/skills/${arg.id}`,
          method: "GET",
        };
      },

      providesTags: [tagTypes.skills],
    }),

    updateSkill: build.mutation({
      query: ({id,...data}) => {
        console.log("daddddddddddddddddddddta")
        return {
          url: `/skills/${id}`,
          method: "PATCH",
          data: data,
        }
      },
      invalidatesTags: [tagTypes.skills],
    }),
    deleteSkill: build.mutation({
      query: (id) => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.skills],
    }),
  }),
});

export const {
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useGetAllSkillsQuery,
  useGetSingleSkillQuery,
  useUpdateSkillMutation,
} = skillApi;
