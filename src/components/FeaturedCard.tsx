import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Phone,
  Star,
  MapPin,
  CheckCircle,
} from "lucide-react";

interface FeaturedCardProps {
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  verified: boolean;
  serviceRoute?: string;
}

export function FeaturedCard({
  name,
  category,
  location,
  rating,
  reviews,
  description,
  image,
  verified,
  serviceRoute = "/service",
}: FeaturedCardProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goToService = () => {
    navigate(serviceRoute, { state: { from: pathname } });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={goToService}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          goToService();
        }
      }}
      className="bg-card rounded-lg shadow-md overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <div className="relative">
        <img
          src={image}
          alt="Business Image"
          className="w-full h-48 object-cover"
        />

        {verified && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" /> VERIFIED
          </div>
        )}
        <div className="absolute top-4 right-4 bg-transparent rounded-full p-2 shadow-md">
          <Heart className="w-5 h-5 text-text-white" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-inter font-semibold text-text-primary mb-1">
          {name}
        </h3>
        <p className="text-primary text-sm font-inter font-medium mb-2">
          {category}
        </p>
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-1 text-text-secondary" />
          <span className="text-text-secondary font-inter font-medium">
            {location}
          </span>
        </div>
        <div className="flex items-center text-sm mb-4">
          <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
          <span className="font-medium font-inter text-sm text-text-primary">
            {rating}
          </span>
          <span className="font-normal font-inter text-sm text-text-secondary">
            ({reviews})
          </span>
        </div>
        <p className="font-normal font-inter text-sm text-text-secondary mb-6">
          {description}
        </p>
        <button
          type="button"
          onClick={(event) => event.stopPropagation()}
          className="w-full bg-destructive text-destructive-foreground py-2 rounded-lg flex items-center justify-center font-semibold mb-3 hover:bg-destructive/90 transition-colors"
        >
          <Phone className="w-5 h-5 mr-2" /> Show phone number
        </button>
        <Link
          to="/messages"
          state={{ from: pathname }}
          onClick={(event) => event.stopPropagation()}
          className="w-full border border-primary text-primary py-2 rounded-lg flex items-center justify-center font-semibold hover:bg-primary/10 transition-colors"
        >
          <MessageCircle className="w-5 h-5 mr-2" /> Direct Message
        </Link>
      </div>
    </div>
  );
}
