import { Button } from "@/components/ui/button";
import { Search, MapPin, Clock } from "lucide-react";

interface HeroProps {
  onShowForm: () => void;
}

const Hero = ({ onShowForm }: HeroProps) => {
  const scrollToItems = () => {
    const element = document.getElementById("items");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Lost Something?
            <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 opacity-90">
              We'll Help You Find It
            </span>
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 opacity-90 leading-relaxed">
            Campus Lost & Found connects our community to reunite people with their belongings. 
            Report lost items, browse found items, and help make our campus a better place.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg"
              onClick={onShowForm}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Report Item
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={scrollToItems}
              className="bg-white text-primary hover:bg-white/90 border-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
            >
              <Search className="w-5 h-5 mr-2" />
              Browse Items
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Find Items</h3>
              <p className="text-white/80">Search through reported items</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Campus Wide</h3>
              <p className="text-white/80">Coverage across all buildings</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">24/7 Access</h3>
              <p className="text-white/80">Report and search anytime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;