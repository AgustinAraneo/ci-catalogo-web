import { TrendingItems } from "./Home/TrendingItems";
import { AdvantageSection } from "./Home/ui/Advantage";
import { Banner } from "./Home/ui/Banner";
import { Discount } from "./Home/ui/Discount";
import { TrendingProducts } from "./Home/ui/TrendingProducts";

export default function Home() {
  return (
    <div>
      <Banner />
      <TrendingProducts />
      <Discount />
      <AdvantageSection />
      <TrendingItems />
    </div>
  );
}
