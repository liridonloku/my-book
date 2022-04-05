import { Cloudinary } from "@cloudinary/url-gen";
import Axios from "axios";

export const cld = new Cloudinary({
  cloud: {
    cloudName: "dh72xea8l",
  },
});

export const uploadPicture = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || ""
  );
  const upload = await Axios.post(
    "https://api.cloudinary.com/v1_1/dh72xea8l/upload",
    formData
  );
  return upload;
};
