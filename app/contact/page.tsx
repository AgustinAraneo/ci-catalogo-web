import { FormContact } from "./ui/form_contact/FormContact";
import { HomeContact } from "./ui/HomeContact";

const page = () => {
  return (
    <div>
      <HomeContact />
      <FormContact/>
    </div>
  );
};

export default page;
