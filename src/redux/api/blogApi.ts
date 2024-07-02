import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlogs: build.mutation({
      query: (data) => {
        console.log(data)
        return {
          url: "/blogs",
          method: "POST",
          data: data.data,
        }
      },
      invalidatesTags: [tagTypes.blogs],
    }),

    getAllBlogs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/blogs",
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
      providesTags: [tagTypes.blogs],
    }),
    getSingleBlog: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/blogs/${arg.id}`,
          method: "GET",
        };
      },

      providesTags: [tagTypes.blogs],
    }),

    updateBlogs: build.mutation({
      query: (data) => {
        console.log(data)
        return {
          url: `/blogs/${data.id}`,
          method: "PATCH",
          data: data.data,
        }
      },
      invalidatesTags: [tagTypes.blogs],
    }),
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blogs],
    }),
  }),
});

export const {
  useCreateBlogsMutation,
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useUpdateBlogsMutation,
} = blogApi;
