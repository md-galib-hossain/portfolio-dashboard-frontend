import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";
import { TMeta } from "@/types/common";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation({
      query: (formatted) => {
        console.log(formatted)
        return {
          url: "/projects",
          method: "POST",
         data: formatted.data,
        }
      },
      invalidatesTags: [tagTypes.projects],
    }),

    getAllProjects: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/projects",
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
      providesTags: [tagTypes.projects],
    }),
    getSingleProject: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/projects/${arg.id}`,
          method: "GET",
        };
      },

      providesTags: [tagTypes.projects],
    }),

    updateProject: build.mutation({
      query: (formatted) => {
       console.log(formatted,formatted.id)
        return {
          url: `/projects/${formatted.id}`,
          method: "PATCH",
          data: formatted.data,
        }
      },
      invalidatesTags: [tagTypes.projects],
    }),
    deleteProject: build.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.projects],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} = projectApi;
