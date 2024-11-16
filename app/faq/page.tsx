import { Breadcrum } from "@/components/ui/Breadcrum/Breadcrum";
import { HomeFaq } from "./ui/HomeFaq";

const page = () => {
  return (
    <div>
      <Breadcrum page="Preguntas Frecuentes" />
      <HomeFaq />
    </div>
  );
};

export default page;
