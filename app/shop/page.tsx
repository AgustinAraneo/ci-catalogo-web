import { Breadcrumb } from "@/components/ui/Breadcrum/Breadcrumb";
import { HomeShop } from "./ui/HomeShop";

const page = () => {
  return (
    <div>
      <Breadcrumb page="Productos" />
      <HomeShop />
    </div>
  );
};

export default page;
