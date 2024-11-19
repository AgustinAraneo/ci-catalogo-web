import Link from "next/link";
import type { Product } from "@/types/type";
import { HomeIndividualProduct } from "./ui/HomeIndividualProduct";
import { Breadcrumb } from "@/components/ui/Breadcrum/Breadcrumb";
import { InstagramGallery } from "@/app/contact/ui/carrousel contact/CarrouselContact";

export const IndividualItemView = async ({
  params,
}: {
  params: { id: string };
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/db/products/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div>Producto no encontrado</div>;
  }

  const product: Product = await res.json();

  return (
    <div>
      <Breadcrumb page="Productos" />
      <div className="container mx-auto p-7 pb-20">
        <HomeIndividualProduct product={product} />
        <Link href="/admin">
          <p className="bg-black text-white p-2 rounded ">Volver</p>
        </Link>
      </div>
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 pb-5">
        También puede interesarte:
      </h2>
      <InstagramGallery />
    </div>
  );
};

export default IndividualItemView;
