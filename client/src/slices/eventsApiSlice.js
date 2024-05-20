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
    getRegisteredEvents: builder.mutation({
      query: () => ({
        url: `${EVENTS_URL}/registered-events`,
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
    registerForEvent: builder.mutation({
      query: (eventId) => ({
        url: `${EVENTS_URL}/register`,
        method: "POST",
        body: { eventId },
      }),
    }),
    deregisterFromEvent: builder.mutation({
      query: (eventId) => ({
        url: `${EVENTS_URL}/deregister`,
        method: "POST",
        body: { eventId },
      }),
    }),
    getSuggestedEvents: builder.mutation({
      query: () => ({
        url: `${EVENTS_URL}/suggested-events`,
        method: "GET",
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
  useRegisterForEventMutation,
  useGetRegisteredEventsMutation,
  useDeregisterFromEventMutation,
  useGetSuggestedEventsMutation,
} = eventsApiSlice;
