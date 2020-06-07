import React from "react";
import "./home-carousel.styles.scss";
import ocean from "../../assets/ocean.jpg";
import forest from "../../assets/forest.jpg";
import cloud from "../../assets/clouds.jpg";

const HomeCarousel = () => {
  return (
    <div className="home-carousel">
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={ocean}
              style={{ width: "100%", maxHeight: "600px", objectFit: "cover" }}
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              src={forest}
              style={{ width: "100%", maxHeight: "600px", objectFit: "cover" }}
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              src={cloud}
              style={{ width: "100%", maxHeight: "600px", objectFit: "cover" }}
              alt="Third slide"
            />
          </div>
        </div>
      </div>
      <div className="carousel-hero-text">
        <h1>Welcome to Pixartwork</h1>
        <h4>Upload and share awesome photos</h4>
      </div>
    </div>
  );
};

export default HomeCarousel;
