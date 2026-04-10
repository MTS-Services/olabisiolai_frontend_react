import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-accent py-20 mb-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-inter font-semibold text-[56px]">
            What are you looking for today?
          </h2>
          <p className="text-popover font-normal text-xl mt-4 mx-auto flex flex-col items-center text-center">
            Discover trusted businesses and professionals near you.
          </p>
        </div>
        <div className="mt-10 mb-14">
          <div className="flex justify-center">
            <InputGroup className="max-w-2xl border-muted bg-transparent px-1 py-6">
              <InputGroupInput 
                placeholder="Search by business name, category, or location..." 
                className="placeholder:text-muted text-text-white"
              />
              <InputGroupAddon align="inline-end" className="bg-primary-foreground p-3 rounded-lg">
                <Search className="w-6 h-6 text-text-white" />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
