import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/firebase";
import HomeCarousel from "../../../../components/home-carousel/home-carousel.component";
import HomeMasonry from "../../../../components/home-masonry/home-masonry.component";
import Lightbox from "../lightbox-homepage/lightbox.homepage";

import "./latest-homepage.scss";

const LatestHomePage = () => {
  const [featuredImages, setFeaturedImages] = useState([]);
  const [isLightbox, setIsLightbox] = useState(false);
  const [index, setIndex] = useState();
  useEffect(() => {
    db.collection("users")
      .limit(10)
      .get()
      .then((snapshot) => {
        snapshot.forEach((item) => {
          let { name, profilePic, ImageStock,profileUrl } = item.data();
          if (ImageStock !== undefined) {
            ImageStock = ImageStock.forEach((item, id) => {
              if (id === 0)
                setFeaturedImages((prev) => [
                  ...prev,
                  {
                    name,
                    imgUrl: item.imgUrl,
                    thumbURL: item.thumbURL,
                    title: item.title,
                    profilePic,
                    profileUrl
                  },
                ]);
            });
          }
        });
      })
      .catch((err) => alert(err));
  }, []);

  const handleClick = (e) => {
    const { id } = e.target;

    setIsLightbox(true);
    setIndex(id);
  };
  const closeLightbox = (e) => {
    const { id } = e.target;
    if (id === "lightbox") setIsLightbox(false);
  };
  return (
    <div className="latest-home-page">
      <HomeCarousel />
      <HomeMasonry featuredImages={featuredImages} handleClick={handleClick} />
      {isLightbox && (
        <Lightbox
          featuredImages={featuredImages}
          index={index}
          closeLightbox={closeLightbox}
        />
      )}
    </div>
  );
};

export default LatestHomePage;
