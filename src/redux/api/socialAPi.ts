import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

export const socialApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSocial: build.mutation({
      query: (data) => ({
        url: "/socials",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.social],
    }),

    getAllSocials: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/socials",
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
      providesTags: [tagTypes.social],
    }),
    getSingleSocial: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/socials/${arg.id}`,
          method: "GET",
        };
      },

      providesTags: [tagTypes.social],
    }),

    updateSocial: build.mutation({
      query: ({id,...values}) => ({
        url: `/socials/${id}`,
        method: "PATCH",
        data: values,
      }),
      invalidatesTags: [tagTypes.social],
    }),
    deleteSocial: build.mutation({
      query: (id) => ({
        url: `/socials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.social],
    }),
  }),
});

export const {
  useCreateSocialMutation,
  useDeleteSocialMutation,
  useGetAllSocialsQuery,
  useGetSingleSocialQuery,
  useUpdateSocialMutation,
} = socialApi;
