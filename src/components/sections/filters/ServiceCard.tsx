import { Link, useLocation } from "react-router-dom";
import { Heart, MapPin, Star, Phone, MessageCircle, CheckCircle } from "lucide-react";

interface ServiceCardProps {
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  verified: boolean;
}

export default function ServiceCard({
  name,
  category,
  location,
  rating,
  reviews,
  description,
  image,
  verified,
}: ServiceCardProps) {
  const { pathname } = useLocation();

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden flex mb-6">
      <div className="w-full relative">
        <img
          src={image}
          alt="Business Image"
          className="w-full h-full object-cover"
        />

        {verified && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" /> VERIFIED
          </div>
        )}
        <div className="absolute top-4 right-4 bg-card rounded-full p-2 shadow-md">
          <Heart className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
      <div className="w-full p-6">
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

        <button className="bg-destructive text-destructive-foreground lg:w-50 w-full lg:p-3 p-1 rounded-lg flex items-center justify-center font-semibold hover:bg-destructive/90 transition-colors text-sm mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-phone w-4 h-4 mr-1.5" aria-hidden="true">
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
        </svg>
        Show phone number
      </button>

        <Link to="/messages" className="border border-primary text-primary lg:w-50 w-full lg:p-3 p-1 rounded-lg flex items-center justify-center font-semibold hover:bg-primary/10 transition-colors text-sm" data-discover="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-circle w-4 h-4 mr-1.5" aria-hidden="true">
            <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
          </svg>
          Direct Message
        </Link>

      </div>
    </div>
  );
}
