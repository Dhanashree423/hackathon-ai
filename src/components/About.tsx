import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Shield, Clock } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About Campus Lost & Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We believe in the power of community to help reunite people with their belongings. 
            Our platform makes it easy to report and search for lost items across campus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center p-6 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Built by students, for students. We're all in this together.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 text-success rounded-full mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
              <p className="text-sm text-muted-foreground">
                Simple reporting and searching. No complicated forms or processes.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-warning/10 text-warning rounded-full mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Safe & Secure</h3>
              <p className="text-sm text-muted-foreground">
                Your information is protected and only used for item recovery.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Access</h3>
              <p className="text-sm text-muted-foreground">
                Report or search for items anytime, anywhere on campus.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card rounded-lg border p-8 shadow-[var(--shadow-card)]">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <div className="text-primary font-bold text-lg mb-2">1. Report</div>
                <p className="text-muted-foreground">
                  Lost something? Found something? Report it quickly with our simple form.
                </p>
              </div>
              <div>
                <div className="text-primary font-bold text-lg mb-2">2. Search</div>
                <p className="text-muted-foreground">
                  Browse through items, use filters, and search by keywords to find matches.
                </p>
              </div>
              <div>
                <div className="text-primary font-bold text-lg mb-2">3. Connect</div>
                <p className="text-muted-foreground">
                  Contact the person directly to arrange pickup and reunite with your belongings.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Questions or suggestions? We're here to help make our campus community stronger.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;