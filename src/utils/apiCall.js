import axios from 'axios';
import {Buffer} from 'buffer';

const secretkid = '9fbaf3ee-39bd-43e4-b464-7b710ecdf303';
const secretkey = 'k9Aac5Nk23whIZEfb1330+nZ';

const encodeBase64 = (id, key) => {
  const combined = `${id}:${key}`;
  return Buffer.from(combined).toString('base64');
};

export const verifyPassport = async (liveImage1, liveImage2, idPhoto) => {
  const requestBody = {
    liveimage1: liveImage1,
    liveimage2: liveImage2,
    idphoto: idPhoto,
  };
  const authHeader = `Basic ${encodeBase64(secretkid, secretkey)}`;

  const axiosInstance = axios.create({
    proxy: {
      host: 'https://bws.bioid.com',
    },
  });

  const response = await axiosInstance.post(
    'https://bws.bioid.com/extension/photoverify',
    requestBody,
    {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.status === 200) {
    if (response.data === true) {
      return 'Live images do match the ID photo';
    } else {
      return 'Live images do not match the ID photo';
    }
  } else {
    return `Error: ${response.status} ${response.statusText}`;
  }
};
