import * as LucideIcons from "lucide-react";

interface CategoryCardProps {
  name: string;
  icon: string;
  onClick?: () => void;
}

export function CategoryCard({ name, icon, onClick }: CategoryCardProps) {
  const IconComponent = (LucideIcons as any)[icon];

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior - navigate to category page
      console.log(`Clicked on ${name} category`);
    }
  };

  return (
    <div>
      <div 
        onClick={handleClick}
        className="flex flex-col items-center gap-2 py-6 px-4 bg-[#F4F5F7] rounded-2xl hover:shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
      >
        <div className="p-4 bg-white rounded-full">
          {IconComponent && <IconComponent className="w-8 h-8 text-text-primary" />}
        </div>
        <p className="text-base font-inter text-text-primary font-medium text-center">
          {name}
        </p>
      </div>
    </div>
  );
}
