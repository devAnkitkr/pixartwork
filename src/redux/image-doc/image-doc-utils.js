export const removeImage = (imageDoc, id) => {
  return imageDoc.filter((img) => img.id !== Number(id));
};

export const addImageTitle = (imageDoc, title, id) => {
  imageDoc.forEach((img) => {
    if (img.id === id) {
      img.title = title;
    }
  });
  return imageDoc;
};

export const addImageTags = (imageDoc, tag, id) => {
  imageDoc.forEach((img) => {
    if (img.id === id) {
      img.tags.push(tag);
    }
  });
  return imageDoc;
};

export const removeImageTags = (imageDoc, tag, id) => {
  imageDoc.forEach((img) => {
    if (img.id === id) {
       img.tags = img.tags.filter(item=> item !== tag)
    }
  });
  return imageDoc;
};
