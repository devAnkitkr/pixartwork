import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/firebase";
import HomeMasonry from "../../../../components/home-masonry/home-masonry.component";
import Lightbox from "../lightbox-homepage/lightbox.homepage";

import "./section-homepage.scss";

const SectionHomePage = ({ match }) => {
  const [sectionImages, setSectionImages] = useState([]);
  const [isLightbox, setIsLightbox] = useState(false);
  const [index, setIndex] = useState();

  useEffect(() => {
    db.collection("users")
      .limit(20)
      .get()
      .then((snapshot) => {
        snapshot.forEach((item) => {
          let { name, profilePic, ImageStock, profileUrl } = item.data();
          if (ImageStock !== undefined) {
            ImageStock = ImageStock.forEach((item) => {
              if (item.tags.includes(match.params.tagId))
                setSectionImages((prev) => [
                  ...prev,
                  {
                    name,
                    imgUrl: item.imgUrl,
                    thumbURL: item.thumbURL,
                    title: item.title,
                    profilePic,
                    profileUrl,
                  },
                ]);
            });
          }
        });
      })
      .catch((err) => alert(err));
    return () => {
      setSectionImages([]);
    };
  }, [match.params.tagId]);

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
    <div className="section-home-page">
      <h2 className="text-secondary m-4 p-4 text-capitalize">
        {match.params.tagId}
      </h2>
      {sectionImages.length !== 0 && (
        <HomeMasonry featuredImages={sectionImages} handleClick={handleClick} />
      )}
      {isLightbox && (
        <Lightbox
          featuredImages={sectionImages}
          index={index}
          closeLightbox={closeLightbox}
        />
      )}
    </div>
  );
};

export default SectionHomePage;
