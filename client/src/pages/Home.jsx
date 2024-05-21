import { useSelector } from "react-redux";
import Banner from "../atoms/Carousel/Banner";
import EventScreen from "./EventScreen";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) {
    return (
      <div className="w-full flex flex-col items-center justify-center self-center">
        <Banner />
      </div>
    );
  }
  return <EventScreen />;
};

export default Home;
