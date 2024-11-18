import { TrendingItems } from "@/components/ui/Home/TrendingItems";
import { Banner } from "@/components/ui/Home/ui/Banner";
import { TrendingProducts } from "@/components/ui/Home/ui/TrendingProducts";

export default function Home() {
  return (
    <div>
      <Banner />
      <TrendingProducts />
      <TrendingItems />
    </div>
  );
}
