import { Breadcrumb } from "@/components/ui/Breadcrum/Breadcrumb";
import { HomeFaq } from "./ui/HomeFaq";

const page = () => {
  return (
    <div>
      <Breadcrumb page="Preguntas Frecuentes" />
      <HomeFaq />
    </div>
  );
};

export default page;
