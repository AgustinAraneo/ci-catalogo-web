import { v4 as uuidv4 } from "uuid";

const GITHUB_API_BASE = "https://api.github.com/repos";
const REPO = "Nehros-admin/ci-catalog-photos";
const BRANCH = "main";
const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

export const fetchImageUrls = async (
  products: { id: string; imageUrl?: string }[]
): Promise<Record<string, string>> => {
  const promises = products.map((product) => {
    if (!product.id || !product.imageUrl) return null;

    const url = `${GITHUB_API_BASE}/${REPO}/contents/${product.imageUrl}?ref=${BRANCH}`;
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          return { productId: product.id, downloadUrl: data.download_url };
        }
        console.error(
          `Error fetching image for ${product.id}: ${response.status}`
        );
        return null;
      })
      .catch((error) => {
        console.error(`Error fetching image for ${product.id}:`, error);
        return null;
      });
  });

  const results = await Promise.all(promises);
  return results.reduce((acc, result) => {
    if (result?.productId) {
      acc[result.productId] = result.downloadUrl;
    }
    return acc;
  }, {} as Record<string, string>);
};

export const deleteImageFromGitHub = async (fileName: string) => {
  if (!fileName) return;

  const url = `${GITHUB_API_BASE}/${REPO}/contents/${fileName}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (response.ok) {
    const { sha } = await response.json();
    await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Delete image from Next.js",
        sha,
      }),
    });
  } else {
    console.error(`Error fetching SHA for ${fileName}: ${response.status}`);
  }
};

export const uploadImageToGitHub = async (file: File): Promise<string> => {
  try {
    const reader = new FileReader();

    return new Promise<string>((resolve, reject) => {
      reader.onload = async () => {
        const base64File = reader.result?.toString().split(",")[1];
        if (!base64File) {
          reject("Error al leer el archivo");
          return;
        }

        const uniqueId = uuidv4();
        const fileName = `${uniqueId}-${file.name}`;

        const response = await fetch(
          `https://api.github.com/repos/Nehros-admin/ci-catalog-photos/contents/${fileName}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: "Subida de nueva imagen desde Next.js",
              content: base64File,
            }),
          }
        );

        if (response.ok) {
          resolve(fileName);
        } else {
          reject("Error al subir la imagen a GitHub");
        }
      };
      reader.onerror = () => reject("Error al leer el archivo");
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error("Error al subir la imagen a GitHub:", error);
    throw error;
  }
};

export const deleteOldImageFromGitHub = async (
  fileName: string
): Promise<void> => {
  if (!fileName) return;

  try {
    const response = await fetch(
      `https://api.github.com/repos/Nehros-admin/ci-catalog-photos/contents/${fileName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener información del archivo");
    }

    const data = await response.json();
    const sha = data.sha;

    await fetch(
      `https://api.github.com/repos/Nehros-admin/ci-catalog-photos/contents/${fileName}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Eliminación de imagen antigua desde Next.js",
          sha,
        }),
      }
    );
  } catch (error) {
    console.error("Error al eliminar la imagen de GitHub:", error);
    throw error;
  }
};
