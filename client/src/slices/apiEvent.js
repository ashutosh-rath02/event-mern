import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiEvent = createApi({
  baseQuery,
  tagTypes: ["Event"],
  endpoints: (builder) => ({}),
});
