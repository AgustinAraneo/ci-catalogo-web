// import { type NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   const { ACCOUNT_ID, APPLICATION_KEY, BUCKET_ID } = process.env;
//   const formData = await request.formData();
//   const file = formData.get("file");

//   // Autenticación con Backblaze
//   const authResponse = await fetch(
//     "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Basic ${btoa(`${ACCOUNT_ID}:${APPLICATION_KEY}`)}`,
//       },
//     }
//   );

//   const authData = await authResponse.json();
//   const { authorizationToken, apiUrl } = authData;

//   // Obtener URL de subida
//   const uploadUrlResponse = await fetch(
//     `${apiUrl}/b2api/v2/b2_get_upload_url`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: authorizationToken,
//       },
//       body: JSON.stringify({ bucketId: BUCKET_ID }),
//     }
//   );

//   const uploadUrlData = await uploadUrlResponse.json();

//   // Subir el archivo
//   const uploadResponse = await fetch(uploadUrlData.uploadUrl, {
//     method: "POST",
//     headers: {
//       Authorization: uploadUrlData.authorizationToken,
//       "X-Bz-File-Name": file.name,
//       "Content-Type": file.type,
//       "X-Bz-Content-Sha1": "do_not_verify", // Alternativa rápida; en producción, calcula el SHA1
//     },
//     body: file,
//   });

//   const uploadResult = await uploadResponse.json();
//   return NextResponse.json(uploadResult);
// }
