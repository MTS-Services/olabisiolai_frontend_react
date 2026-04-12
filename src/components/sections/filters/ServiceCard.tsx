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
        <button className="w-full bg-destructive text-destructive-foreground py-3 rounded-lg flex items-center justify-center font-semibold mb-3 hover:bg-destructive/90 transition-colors">
          <Phone className="w-5 h-5 mr-2" /> Show phone number
        </button>
        <Link
          to="/messages"
          state={{ from: pathname }}
          className="w-full border border-primary text-primary py-3 rounded-lg flex items-center justify-center font-semibold hover:bg-primary/10 transition-colors"
        >
          <MessageCircle className="w-5 h-5 mr-2" /> Direct Message
        </Link>
      </div>
    </div>
  );
}
