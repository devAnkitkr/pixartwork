export const addImage = (imageDoc) => ({
  type: "SET_IMAGE_DOC",
  payload: imageDoc,
});

export const removeImage = id =>({
    type:'REMOVE_IMAGE_DOC',
    payload:id
})

export const addImageTitle =(id, title) =>({
  type:'SET_IMAGE_DOC_TITLE',
  payload:title,id
})

export const addImageTags = (id, tag)=>({
  type:'SET_IMAGE_DOC_TAGS',
  payload:tag,id
})

export const removeImageTags=(tag,id) =>({
  type:'REMOVE_IMAGE_DOC_TAGS',
  payload:tag,id
})