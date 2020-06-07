import * as firebase from "firebase/app";
import "firebase/auth"; //authorization
import "firebase/firestore"; //database
import "firebase/storage"; //storage

const firebaseConfig = {
  apiKey: "AIzaSyCIllpBWOCoKStX0AUdAcdaxrHUHSNtmSg",
  authDomain: "auth-testing-1d219.firebaseapp.com",
  databaseURL: "https://auth-testing-1d219.firebaseio.com",
  projectId: "auth-testing-1d219",
  storageBucket: "auth-testing-1d219.appspot.com",
  messagingSenderId: "534197875599",
  appId: "1:534197875599:web:ea8b25cf870de2f8e091fa",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export const createUserProfileDoc = (uid, email, name) => {
  let docRef = db.collection("users").doc(uid);
  const createdAt = new Date();
  let userRef = docRef
    .set({
      name,
      email,
      createdAt,
      profilePic: "",
      profileUrl: uid,
    })
    .then(() => {
      alert("successfully created user db");
      return userRef;
    })
    .catch((error) => alert("error creating user db", error));
};

export const getUserProfileDoc = (uid) => {
  const userRef = db
    .doc(`users/${uid}`)
    .get()
    .then((snapshot) => snapshot.data())
    .catch((error) => console.log(error));
  return userRef;
};

const uploadImagesToDatabase = (uid, imgItem, downloadURL) => {
  return new Promise((resolve, reject) => {
    let ext = "";
    if (downloadURL.includes("jpg")) ext = ".jpg";
    else if (downloadURL.includes("jpeg")) ext = ".jpeg";
    else ext = ".png";
    const thumbURL = downloadURL.split(ext).shift();
    const extension = downloadURL.split(ext).pop();
    const createdAt = new Date();
    db.doc("users/" + uid)
      .update({
        ImageStock: firebase.firestore.FieldValue.arrayUnion({
          tags: imgItem.tags,
          title: imgItem.title,
          imgUrl: downloadURL,
          thumbURL: thumbURL + `_400x400${ext}` + extension,
          createdAt,
        }),
      })
      .then(function () {
        resolve("success");
      })
      .catch(function (error) {
        reject();
      });
  });
};
export const uploadImagesToStorage = (imageDoc, uid) => {
  return new Promise((resolve, reject) => {
    let increment = 0;
    imageDoc.forEach((imgItem) => {
      const uploadTask = storage
        .ref()
        .child(`images/${uid}/` + imgItem.fileName)
        .putString(imgItem.file, "data_url");
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject();
        },
        async () => {
          const getUrl = await uploadTask.snapshot.ref.getDownloadURL();
          const getStatus = await uploadImagesToDatabase(uid, imgItem, getUrl);
          if (getStatus === "success") {
            increment++;
            if (increment === imageDoc.length) resolve("success");
          }
        }
      );
    });
  });
};

export const getUserCollection = (uid) => {
  return new Promise((resolve, reject) => {
    const listRef = storage.ref().child(`images/${uid}`);
    listRef
      .listAll()
      .then((res) => {
        let dataArray = [];
        res.items.forEach((imageRef) => {
          let image = imageRef.fullPath.toString();
          storage
            .ref()
            .child(image)
            .getDownloadURL()
            .then((url) => {
              dataArray.push(url);
            });
        });
        resolve(dataArray);
      })
      .catch((error) => reject(error));
  });
};

const uploadProfilePicToDB = (uid, imgUrl) => {
  return new Promise((resolve, reject) => {
    db.doc("users/" + uid)
      .update({
        profilePic: imgUrl,
      })
      .then(function () {
        resolve("success");
      })
      .catch(function (error) {
        reject();
      });
  });
};

export const uploadProfilePicture = (profileImg, fileName, uid) => {
  return new Promise((resolve, reject) => {
    const uploadTask = storage
      .ref()
      .child(`profilePic/${uid}/` + fileName)
      .putString(profileImg, "data_url");
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        reject();
      },
      async () => {
        const getUrl = await uploadTask.snapshot.ref.getDownloadURL();
        const getStatus = await uploadProfilePicToDB(uid, getUrl);
        if (getStatus === "success") resolve("success");
      }
    );
  });
};

export const updateSearchArray = (searchQuery) => {
  return new Promise((resolve, reject) => {
    db.doc("searchField/8KsCqlb458OsvKcFXM4V")
      .update({
        searchArray: firebase.firestore.FieldValue.arrayUnion(searchQuery),
      })
      .then(() => resolve("success"))
      .catch((err) => reject(err));
  });
};
