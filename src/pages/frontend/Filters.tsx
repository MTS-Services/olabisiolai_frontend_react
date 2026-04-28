import FiltersSection from "@/components/sections/filters/FiltersSection";
import ServiceCard from "@/components/sections/filters/ServiceCard";
import { useCategoryCatalog } from "@/features/categories/useCategoryCatalog";
import { ChevronLeft, Map, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

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

const MOCK_FEATURED_BUSINESSES: BusinessType[] = [
  {
    id: 1,
    name: "Premium Plumbing Services",
    category: "Plumbing",
    location: "Lagos, Ikeja",
    rating: 4.8,
    reviews: 127,
    description:
      "Professional plumbing services for residential and commercial properties. Available 24/7 for emergencies.",
    image: "/images/feature/1.jpg",
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
    image: "/images/feature/1-1.jpg",
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
    image: "/images/feature/1-2.jpg",
    verified: true,
  },
  {
    id: 4,
    name: "Glamour Beauty Spa",
    category: "Beauty & Spa",
    location: "Lagos, Lekki",
    rating: 4.7,
    reviews: 156,
    description: "Luxury spa and beauty treatments in a relaxing environment.",
    image: "/images/feature/1-3.jpg",
    verified: true,
  },
];

export default function Filters() {
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramCategory = (searchParams.get("category") ?? "").trim();

  const { data: apiCategories = [], isPending: categoriesLoading } = useCategoryCatalog();
  const categoryNames = useMemo(() => apiCategories.map((c) => c.name), [apiCategories]);
  const categoryFilterLabels = useMemo(() => ["All", ...categoryNames], [categoryNames]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (!paramCategory) return;
    if (categoryNames.length === 0) return;
    if (categoryNames.includes(paramCategory)) setSelectedCategory(paramCategory);
  }, [paramCategory, categoryNames]);

  const handleSelectCategory = (label: string) => {
    setSelectedCategory(label);
    const next = new URLSearchParams(searchParams);
    if (label === "All") next.delete("category");
    else next.set("category", label);
    setSearchParams(next, { replace: true });
  };

  const visibleBusinesses = useMemo(() => {
    if (selectedCategory === "All") return MOCK_FEATURED_BUSINESSES;
    return MOCK_FEATURED_BUSINESSES.filter((b) => b.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm py-4 px-6">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="flex items-center font-inter font-normal text-base text-primary hover:text-primary/80"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-inter font-bold text-text-primary mt-4">
            All Business
          </h1>
          <p className="text-text-secondary font-inter font-normal text-sm sm:text-base mt-2">
            All categories are showing here
          </p>
        </div>
      </div>

      {/* Mobile Action Bar — visible only on mobile */}
      <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-card border-b border-border sticky top-0 z-20">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg border border-border text-sm font-medium text-text-primary hover:bg-muted"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
        <button
          onClick={() => setShowMap(true)}
          className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg border border-border text-sm font-medium text-text-primary hover:bg-muted"
        >
          <Map size={16} />
          View Map
        </button>
      </div>

      {/* Mobile Filters Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFilters(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-4/5 max-w-sm bg-background overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background z-10">
              <span className="font-inter font-semibold text-text-primary text-lg">
                Filters
              </span>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 rounded-md hover:bg-muted"
              >
                <X size={20} className="text-text-secondary" />
              </button>
            </div>
            <div className="p-4">
              <FiltersSection
                categoryLabels={categoryFilterLabels}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                categoriesLoading={categoriesLoading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Map Drawer */}
      {showMap && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowMap(false)}
          />
          {/* Drawer from bottom */}
          <div className="absolute left-0 right-0 bottom-0 h-full bg-background rounded-t-2xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-border bg-background z-10">
              <span className="font-inter font-semibold text-text-primary text-lg">
                Map View
              </span>
              <button
                onClick={() => setShowMap(false)}
                className="p-1 rounded-md hover:bg-muted"
              >
                <X size={20} className="text-text-secondary" />
              </button>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1664374611155!2d90.41842197589845!3d23.81267988638146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c73499552657%3A0xed30abd127dd179f!2smaktech!5e0!3m2!1sen!2sbd!4v1775822816302!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 lg:py-8 flex gap-6">

        {/* Filters Sidebar — hidden on mobile, visible on lg+ */}
        <aside className="hidden lg:block w-1/6 shrink-0">
          <FiltersSection
            categoryLabels={categoryFilterLabels}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            categoriesLoading={categoriesLoading}
          />
        </aside>

        {/* Business Cards Section */}
        <div className="w-full lg:w-3/6 min-w-0">
          <div className="mt-0 lg:mt-4 space-y-4">
            {visibleBusinesses.map((business) => (
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

          {/* Pagination */}
          <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-6 flex-wrap">
            <button className="p-2 rounded-lg border border-border hover:bg-muted">
              <ChevronLeft size={16} className="text-muted-foreground" />
            </button>

            {/* Show fewer pages on mobile */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm rounded-lg ${page === 1
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-text-primary hover:bg-muted"
                    } ${page > 5 ? "hidden sm:flex items-center justify-center" : "flex items-center justify-center"}`}
                >
                  {page.toString().padStart(2, "0")}
                </button>
              ))}
            </div>

            <button className="p-2 rounded-lg border border-border hover:bg-muted">
              <ChevronLeft size={16} className="text-muted-foreground rotate-180" />
            </button>
          </div>
        </div>

        {/* Map Section — hidden on mobile, visible on lg+ */}
        <aside className="hidden lg:block w-2/6 shrink-0">
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
              />
              <div className="absolute bottom-4 right-4 bg-card rounded-lg shadow-md p-2">
                <button className="p-2 hover:bg-muted rounded">
                  <span className="text-text-primary">+</span>
                </button>
                <button className="p-2 hover:bg-muted rounded">
                  <span className="text-text-primary">-</span>
                </button>
                <button className="p-2 hover:bg-muted rounded">
                  <span className="text-text-primary">fullscreen</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}