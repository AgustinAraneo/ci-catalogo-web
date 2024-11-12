// "use client";

// import { useEffect, useState } from "react";

// export default function TestBucket() {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       const response = await fetch("/api/v1/bucket/list-images");
//       const data = await response.json();
//       setImages(data.files || []);
//     };
//     fetchImages();
//   }, []);

//   console.log(images);

//   return (
//     <div>
//       <h2>Images in Bucket</h2>
//       {images.map((image) => (
//         <div key={image.fileId}>
//           <p>{image.fileName}</p>
//           <img
//             src={
//               "https://ci-clothe-shop.s3.us-east-005.backblazeb2.com/ok-bro-ok.gif"
//             }
//             alt={image.fileName}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }
