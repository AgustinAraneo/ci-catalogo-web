import { FormContact } from "./ui/form contact/FormContact";
import { HomeContact } from "./ui/HomeContact";
import { MapEmbed } from "./ui/maps contact/MapContact";

const page = () => {
  return (
    <div>
      <HomeContact />
      <FormContact/>
      <MapEmbed />
    </div>
  );
};

export default page;
