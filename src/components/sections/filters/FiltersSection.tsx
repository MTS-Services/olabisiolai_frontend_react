import { Star } from "lucide-react";

export default function FiltersSection() {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md h-screen sticky top-20">
      <h2 className="text-2xl font-inter font-bold text-text-primary mb-6">
        Filters
      </h2>

      {/* Verified Only Toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-text-primary">Verified Only</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-card after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      {/* Category Section */}
      <div className="mb-6">
        <h3 className="font-inter font-semibold text-text-primary mb-3">
          Category
        </h3>
        <div className="space-y-2">
          {[
            "All",
            "Plumbing",
            "Electrical",
            "Catering",
            "Cleaning",
            "Construction",
            "Beauty & Spa",
            "Photography",
          ].map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                className="mr-2 accent-primary"
              />
              <span className="text-text-secondary">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Distances Section */}
      <div className="mb-6">
        <h3 className="font-inter font-semibold text-text-primary mb-3">
          Distances
        </h3>
        <div className="space-y-2">
          {["1 km", "2 km", "3 km", "4 km", "5 km", "10 km", "20 km"].map(
            (distance) => (
              <label key={distance} className="flex items-center">
                <input
                  type="radio"
                  name="distance"
                  className="mr-2 accent-primary"
                />
                <span className="text-text-secondary">{distance}</span>
              </label>
            ),
          )}
        </div>
      </div>

      {/* Ratings & Reviews Section */}
      <div className="mb-6">
        <h3 className="font-inter font-semibold text-text-primary mb-3">
          Ratings & Reviews
        </h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                className="mr-2 accent-primary"
              />
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground/40"
                    }
                  />
                ))}
              </div>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${rating * 20}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
