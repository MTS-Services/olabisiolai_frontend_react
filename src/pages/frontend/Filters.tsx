import FiltersSection from "@/components/sections/filters/FiltersSection";
import ServiceCard from "@/components/sections/filters/ServiceCard";
import { ChevronLeft } from "lucide-react";

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

export default function Filters() {
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
      name: "Elite Electrical Solutions",
      category: "Electrical",
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
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm py-4 px-6">
        <div className="container mx-auto px-4">
          <div className="">
            <a
              href="#"
              className="flex items-center font-inter font-normal text-base text-primary hover:text-primary/80"
            >
              <ChevronLeft size={20} className="mr-1" />
              Back to Home
            </a>
          </div>
          <h1 className="text-3xl font-inter font-bold text-text-primary mt-4">
            All Business
          </h1>
          <p className="text-text-secondary font-inter font-normal text-base mt-2">
            All categories are showing here
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex gap-6">
        {/* Filters Sidebar - 1/3 width */}
        <FiltersSection />


        {/* Business Cards Section - 3/6 width */}
        <div className="w-3/6">
          <div className="mt-4">
            {featuredBusinesses.map((business) => (
              <ServiceCard
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

          {/* Pagination - Below business cards */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button className="p-2 rounded-lg border border-border hover:bg-muted">
              <ChevronLeft size={16} className="text-muted-foreground" />
            </button>
            {[1, 2, 3, 4, 5, 6, 7].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-lg ${page === 1
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-text-primary hover:bg-muted"
                  }`}
              >
                {page.toString().padStart(2, "0")}
              </button>
            ))}
            <button className="p-2 rounded-lg border border-border hover:bg-muted">
              <ChevronLeft size={16} className="text-muted-foreground rotate-180" />
            </button>
          </div>
        </div>
        {/* Map Section - 1/3 width */}
        <div className="w-2/6 ">
          <div className="bg-card rounded-lg shadow-md overflow-hidden sticky top-20">
            <div className="h-[750px] bg-muted relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1664374611155!2d90.41842197589845!3d23.81267988638146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c73499552657%3A0xed30abd127dd179f!2smaktech!5e0!3m2!1sen!2sbd!4v1775822816302!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute bottom-4 right-4 bg-card rounded-lg shadow-md p-2">
                <button className="p-2 hover:bg-muted rounded">
                  <span className="text-text-primary">+</span>
                </button>
                <button className="p-2 hover:bg-muted rounded">
                  <span className="text-text-primary">-</span>
                </button>
                <button className="p-2 hover:bg-muted rounded">
                  <span className="text-text-primary"> fullscreen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
