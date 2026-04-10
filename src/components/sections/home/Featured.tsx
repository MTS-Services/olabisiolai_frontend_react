import { FeaturedCard } from "@/components/FeaturedCard";
import { Link } from "react-router-dom";

interface BusinessType {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  verified: boolean;
}

export default function Featured() {
  const featuredBusinesses: BusinessType[] = [
    {
      id: 1,
      name: "Premium Plumbing Services",
      category: "Plumbing",
      location: "Lagos, Ikeja",
      rating: 4.8,
      reviews: 127,
      description:
        "Professional plumbing services for residential and commercial properties. Available 24/7 for emergencies.",
      image: "src/assets/feature/1.jpg",
      verified: true,
    },
    {
      id: 2,
      name: "Sparkle Clean Services",
      category: "Cleaning",
      location: "Lagos, Surulere",
      rating: 4.9,
      reviews: 203,
      description:
        "Professional cleaning services for homes and offices. Eco-friendly products available.",
      image: "src/assets/feature/1 (1).jpg",
      verified: true,
    },
    {
      id: 3,
      name: "PremiumElite Electrical SolutionsPlumbing Services",
      category: "Plumbing Electrical",
      location: "Lagos, Victoria Island",
      rating: 4.6,
      reviews: 89,
      description:
        "Certified electricians providing safe and reliable electrical installations and repairs.",
      image: "src/assets/feature/1 (2).jpg",
      verified: true,
    },
    {
      id: 4,
      name: "Glamour Beauty Spa",
      category: "Beauty & Spa",
      location: "Lagos, Lekki",
      rating: 4.7,
      reviews: 156,
      description:
        "Luxury spa and beauty treatments in a relaxing environment.",
      image: "src/assets/feature/1 (3).jpg",
      verified: true,
    },
    {
      id: 5,
      name: "Royal Catering & Events",
      category: "Catering",
      location: "Lagos, Lekki",
      rating: 4.9,
      reviews: 178,
      description:
        "Full-service catering for weddings, corporate events, and private parties with local and international cuisines.",
      image: "src/assets/feature/1 (5).jpg",
      verified: true,
    },
    {
      id: 6,
      name: "Master Builders Ltd",
      category: "PlumbingConstruction",
      location: "Lagos, IkeAbuja, Wuseja",
      rating: 4.5,
      reviews: 92,
      description:
        "Complete construction services from foundation to finishing. Licensed and insured.",
      image: "src/assets/feature/1 (4).jpg",
      verified: true,
    },
  ];

  return (
    <div className="mb-20 bg-bg-section">
      <div className="container mx-auto px-4 py-24">
        <div className="">
          <h2 className="text-3xl font-inter font-bold text-text-primary">
            Featured & Verified Businesses
          </h2>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredBusinesses.map((business) => (
              <FeaturedCard
                key={business.id}
                name={business.name}
                category={business.category}
                location={business.location}
                rating={business.rating}
                reviews={business.reviews}
                description={business.description}
                image={business.image}
                verified={business.verified}
              />
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/categories"
            className="bg-primary text-white font-inter font-normal text-lg px-4 py-3 rounded-xl"
          >
            View All Businesses
          </Link>
        </div>
      </div>
    </div>
  );
}
