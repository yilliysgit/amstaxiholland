import ServicesCardSlider from "@/app/components/services/services/ServicesCardSlider";
import type { TaxiService } from "@/types/services/services.type";
import { services as serviceData } from "@/data/services/services.data";

export default function DienstenPage() {
  const items: TaxiService[] = serviceData;

  return (
    <main className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold py-6">Diensten</h1>
      <ServicesCardSlider services={items} />
    </main>
  );
}