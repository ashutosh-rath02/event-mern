import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import "./Banner.css";
const bannerLink1 =
  "https://res.cloudinary.com/dhnkuonev/image/upload/v1715938536/1706382336630_web_bdu7kn.avif";
const bannerLink2 =
  "https://res.cloudinary.com/dhnkuonev/image/upload/v1715938514/1714468446757_kungfupanda4web_cgidbq.avif";
const bannerLink3 =
  "https://res.cloudinary.com/dhnkuonev/image/upload/v1715938505/1714484600065_summerwebbanner_cd1x8v.avif";

const images = [bannerLink1, bannerLink2, bannerLink3];
const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      loop: true,
      slides: {
        origin: "center",
        perView: 1.2,
        spacing: 15,
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className="navigation-wrapper">
      <div ref={sliderRef} className="keen-slider banner">
        {images?.map((image, index) => (
          <div key={index} className="keen-slider__slide">
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <div
            className="arrow-left"
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current.prev();
            }}
          >
            <SlArrowLeft className="arrow--left" />
          </div>

          <div
            className="arrow-right"
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current.next();
            }}
          >
            <SlArrowRight className="arrow--right" />
          </div>
        </>
      )}
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ]?.map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Banner;
