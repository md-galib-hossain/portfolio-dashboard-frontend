import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints : (build) => ({

        createUser: build.mutation({
            query: (data) => ({
              url: "/user",
              method: "POST",
              data,
            }),
            invalidatesTags: [tagTypes.users],
          }),
          updateUser: build.mutation({
            query: (data) => ({
              url: `/user/${data.id}`,
              method: "PATCH",
              data: data.body,
            }),
            invalidatesTags: [tagTypes.users],
          }),

        getUser : build.query({
            query : () => ({
                url : "/user",
                method : "GET"
            }),
            providesTags : [tagTypes.users]
        }),
    })
})

export const {useCreateUserMutation,useGetUserQuery,useUpdateUserMutation} = userApi