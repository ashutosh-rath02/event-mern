import Banner from "../atoms/Carousel/Banner";
// import RecipeReviewCard from "../atoms/EventsGrid/Card";
import EventsGrid from "../atoms/EventsGrid/EventsGrid";
// import Hero from "../atoms/Hero";
// import { useGetEventsQuery } from "../slices/eventsApiSlice";

const Home = () => {
  // const { data: events, error, isLoading } = useGetEventsQuery();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full flex flex-col items-center justify-center self-center">
      <Banner />
      {/* <RecipeReviewCard /> */}
      <EventsGrid />
      {/* <Hero events={events} /> */}
    </div>
  );
};

export default Home;
