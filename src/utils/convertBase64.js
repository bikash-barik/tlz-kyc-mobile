// export const convertImageToBase64 = (uri) => {
//     // Read the image file
//     return new Promise((resolve, reject) => {
//       fetch(uri)
//         .then(response => response.blob())
//         .then(blob => {
//           const reader = new FileReader();
//           reader.onloadend = () => {
//             const base64data = reader.result;
//             resolve(base64data);
//           };
//           reader.onerror = (error) => {
//             reject(error);
//           };
//           reader.readAsDataURL(blob);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   };

import RNFS from 'react-native-fs';

export const convertToBase64 = async uri => {
  try {
    return await RNFS.readFile(uri, 'base64');
  } catch (error) {
    console.log('Error converting image to base64: ', error);
  }
};
// Usage
//   convertImageToBase64("file:///data/user/0/com.tlz/cache/rn_image_picker_lib_temp_d59abf16-a069-4acf-9a23-abd62dbc8617.jpg")
//     .then(base64data => {
//       console.log(base64data);
//     })
//     .catch(error => {
//       console.error('Failed to convert image to base64:', error);
//     });
