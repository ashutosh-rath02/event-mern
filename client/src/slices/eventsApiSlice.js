import { apiSlice } from "./apiSlice";

const EVENTS_URL = "/api/events";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getEvents: builder.query({
      query: () => ({
        url: `${EVENTS_URL}`,
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
      query: ({ eventId, data }) => ({
        url: `${EVENTS_URL}/${eventId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `${EVENTS_URL}/${eventId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApiSlice;
