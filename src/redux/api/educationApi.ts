import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

export const educationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEducations: build.mutation({
      query: (data) => ({
        url: "/educations",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.education],
    }),

    getAllEducations: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/educations",
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
      providesTags: [tagTypes.education],
    }),
    getSingleEducation: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/educations/${arg.id}`,
          method: "GET",
        };
      },

      providesTags: [tagTypes.education],
    }),

    updateEducations: build.mutation({
      query: ({id,...values}) => ({
        url: `/educations/${id}`,
        method: "PATCH",
        data: values,
      }),
      invalidatesTags: [tagTypes.education],
    }),
    deleteEducation: build.mutation({
      query: (id) => ({
        url: `/educations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.education],
    }),
  }),
});

export const {
  useCreateEducationsMutation,
  useDeleteEducationMutation,
  useGetAllEducationsQuery,
  useGetSingleEducationQuery,
  useUpdateEducationsMutation,
} = educationApi;
