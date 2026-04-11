import { CategoryCard } from "@/components/CategoryCard";
import { Link } from "react-router-dom";

interface CategoryType {
  name: string;
  icon: string;
}

export function Category() {
  const categories: CategoryType[] = [
    { name: "Plumbing", icon: "Wrench" },
    { name: "Electrical", icon: "Zap" },
    { name: "Catering", icon: "UtensilsCrossed" },
    { name: "Cleaning", icon: "Sparkles" },
    { name: "Construction", icon: "HardHat" },
    { name: "Beauty & Spa", icon: "Scissors" },
    { name: "Photography", icon: "Camera" },
    { name: "Logistics", icon: "Truck" },
    { name: "Tutoring", icon: "GraduationCap" },
    { name: "Legal Services", icon: "Scale" },
    { name: "Accounting", icon: "Calculator" },
    { name: "Auto Repair", icon: "Car" },
    { name: "Laundry", icon: "Shirt" },
    { name: "Security", icon: "Shield" },
    { name: "Marketing", icon: "Megaphone" },
  ];

  return (
    <div className="mb-20">
      <div className="container mx-auto px-4">
        <div className="">
          <h2 className="text-3xl font-inter font-bold text-text-primary text-center">Browse by Category</h2>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                icon={category.icon}
                to="/filters"
              />
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/filters" className="bg-primary text-primary-foreground font-inter font-medium text-lg px-4 py-3 rounded-xl">All Category</Link>
        </div>
      </div>
    </div>
  );
}
