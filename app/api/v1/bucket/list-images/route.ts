import { NextResponse } from "next/server";

export async function GET() {
  const { ACCOUNT_ID, APPLICATION_KEY, BUCKET_ID } = process.env;

  // Autenticación con Backblaze
  const authResponse = await fetch(
    "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(`${ACCOUNT_ID}:${APPLICATION_KEY}`)}`,
      },
    }
  );

  const authData = await authResponse.json();
  const { authorizationToken, apiUrl } = authData;

  // Obtener archivos en el bucket
  const fileResponse = await fetch(`${apiUrl}/b2api/v2/b2_list_file_names`, {
    method: "POST",
    headers: {
      Authorization: authorizationToken,
    },
    body: JSON.stringify({
      bucketId: BUCKET_ID,
      maxFileCount: 100, // Ajusta este número según tus necesidades
    }),
  });

  const fileData = await fileResponse.json();

  return NextResponse.json(fileData);
}
