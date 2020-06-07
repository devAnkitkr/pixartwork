import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { db } from "../../firebase/firebase";
import HomeMasonry from "../../components/home-masonry/home-masonry.component";
import Lightbox from "../home/components/lightbox-homepage/lightbox.homepage";
import { updateSearchArray } from "../../firebase/firebase";

const SearchPage = ({ match }) => {
  const [sectionImages, setSectionImages] = useState([]);
  const [isLightbox, setIsLightbox] = useState(false);
  const [index, setIndex] = useState();
  useEffect(() => {
    const searchQuery = match.params.searchId.replace("-", " ");
    db.collection("users")
      .limit(20)
      .get()
      .then((snapshot) => {
        snapshot.forEach((item) => {
          let { name, profilePic, ImageStock, profileUrl } = item.data();
          if (ImageStock !== undefined) {
            ImageStock = ImageStock.forEach((item) => {
              if (
                item.title.toLowerCase().includes(searchQuery) ||
                item.tags.includes(searchQuery)
              )
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
  }, [match.params.searchId]);

  useEffect(() => {
    const searchQuery = match.params.searchId.replace("-", " ");
    console.log(sectionImages.length);
    if (sectionImages.length > 1) {
      updateSearchArray(searchQuery)
    }
  }, [sectionImages,match.params.searchId]);

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
        Search result:{match.params.searchId.replace(/-/g, " ")}
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

export default withRouter(SearchPage);
