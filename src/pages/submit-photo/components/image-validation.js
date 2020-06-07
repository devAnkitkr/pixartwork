const fileValidation = (file) => {
  const { name, size } = file;
  const redex = /\.[0-9a-z]+$/i;
  const ext = name.match(redex);
  if (ext[0] === ".jpg" || ext[0] === ".jpeg" || ext[0] ===  ".png") {
    if (size / 1024 / 1024 < 10) return true;
  } else return false;
};
 
export default fileValidation;
