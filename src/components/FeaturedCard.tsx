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
}

export function FeaturedCard({ 
  name, 
  category, 
  location, 
  rating, 
  reviews, 
  description, 
  image, 
  verified 
}: FeaturedCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt="Business Image"
          className="w-full h-48 object-cover"
        />

        {verified && (
          <div className="absolute top-4 left-4 bg-accent text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
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
        <p className="text-accent text-sm font-inter font-medium mb-2">
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
        <button className="w-full bg-primary-foreground text-text-white py-3 rounded-lg flex items-center justify-center font-semibold mb-3 hover:bg-primary-hover transition-colors">
          <Phone className="w-5 h-5 mr-2" /> Show phone number
        </button>
        <button className="w-full border border-ring text-ring py-3 rounded-lg flex items-center justify-center font-semibold transition-colors">
          <MessageCircle className="w-5 h-5 mr-2" /> Direct Message
        </button>
      </div>
    </div>
  );
}
