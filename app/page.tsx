import { TrendingItems } from "@/components/ui/Home/TrendingItems";
import { Banner } from "@/components/ui/Home/ui/Banner";
import { Discount } from "@/components/ui/Home/ui/Discount";
import { TrendingProducts } from "@/components/ui/Home/ui/TrendingProducts";

export default function Home() {
  return (
    <div>
      <Banner />
      <TrendingProducts />
      <Discount />
      <TrendingItems />
    </div>
  );
}
