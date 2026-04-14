import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://koala.finance", lastModified: new Date(), priority: 1 },
    { url: "https://koala.finance/services", lastModified: new Date(), priority: 0.9 },
    { url: "https://koala.finance/services/pension", lastModified: new Date(), priority: 0.8 },
    { url: "https://koala.finance/services/insurance", lastModified: new Date(), priority: 0.8 },
    { url: "https://koala.finance/services/car-insurance", lastModified: new Date(), priority: 0.8 },
    { url: "https://koala.finance/services/net-salary", lastModified: new Date(), priority: 0.8 },
  ];
}
