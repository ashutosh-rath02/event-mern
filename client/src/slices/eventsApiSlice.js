import { apiSlice } from "./apiSlice";
const EVENTS_URL = "/api/events";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    getEvents: builder.mutation({
      query: () => ({
        url: `${EVENTS_URL}`,
        method: "GET",
      }),
    }),
    getEventsCreatedByUser: builder.mutation({
      query: () => ({
        url: `${EVENTS_URL}/profile`,
        method: "GET",
      }),
    }),
    getEventById: builder.query({
      query: (eventId) => ({
        url: `${EVENTS_URL}/${eventId}`,
        method: "GET",
      }),
    }),
    updateEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_URL}/update`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_URL}/delete`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetEventsMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetEventsCreatedByUserMutation,
} = eventsApiSlice;
