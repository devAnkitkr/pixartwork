import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { db } from "../../firebase/firebase";
import ProfileCard from "../../components/profile-card/profile-card.component";
import UserMasonry from "../../components/user-masonry/user-masonry.component";
import Lightbox from "../home/components/lightbox-homepage/lightbox.homepage";

import "./collection.pages.scss";

const CollectionPage = ({ currentUser, match }) => {
  const [userData, setUserData] = useState([]);
  const [profileDetail, setProfileDetail] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLightbox, setIsLightbox] = useState(false);
  const [index, setIndex] = useState();
  console.log("match.params", match.params);

  useEffect(() => {
    setUserData([]);
    const docRef = db.doc("users/" + match.params.uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const imageData = doc.data();
          const { ImageStock, profilePic, name, email, bio } = imageData;
          setProfileDetail({
            profilePic,
            name,
            email,
            bio,
            uid: match.params.uid,
          });
          if (ImageStock)
            ImageStock.forEach((item) => {
              const { imgUrl, title, tags, thumbURL } = item;
              setUserData((prev) => [
                ...prev,
                { imgUrl, thumbURL, title, tags, profilePic, name },
              ]);
            });
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [match.params.uid]);

  const handleClick = (e) => {
    const { id, className } = e.target;
    if (className === "frame-body") {
      setIsLightbox(true);
      setIndex(id);
    }
  };
  const closeLightbox = (e) => {
    const { id } = e.target;
    if (id === "lightbox") setIsLightbox(false);
  };

  return (
    <main className="container text-center">
      <ProfileCard profileDetail={profileDetail} />
      <span className="profile-header">
        {currentUser && currentUser.uid === profileDetail.uid ? (
          <h3>My photo</h3>
        ) : (
          <h3>{profileDetail.name}'s Photo</h3>
        )}
      </span>

      <UserMasonry
        userData={userData}
        profileDetail={profileDetail}
        loading={loading}
        handleClick={handleClick}
      />

      {isLightbox && (
        <Lightbox
          featuredImages={userData}
          index={index}
          closeLightbox={closeLightbox}
        />
      )}
    </main>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(withRouter(CollectionPage));
