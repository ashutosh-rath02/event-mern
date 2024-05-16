import Hero from "../atoms/Hero";
import { useGetEventsQuery } from "../slices/eventsApiSlice";

const Home = () => {
  const { data: events, error, isLoading } = useGetEventsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <Hero events={events} />;
};

export default Home;
