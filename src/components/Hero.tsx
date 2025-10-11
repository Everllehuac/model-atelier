import { Button } from "@/components/ui/button";
import { Upload, TrendingUp, BarChart3 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">Advanced ML Platform</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Machine Learning
          <br />
          Made Simple
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
          Upload your data, clean it, train models, and visualize results—all in one powerful platform. No coding required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          <Button size="lg" variant="gradient" className="group">
            <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            View Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20 animate-in fade-in duration-700 delay-500">
          <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <TrendingUp className="w-8 h-8 text-primary" />
            <div className="text-3xl font-bold">50+</div>
            <div className="text-sm text-muted-foreground">ML Algorithms</div>
          </div>
          <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <Upload className="w-8 h-8 text-accent" />
            <div className="text-3xl font-bold">10K+</div>
            <div className="text-sm text-muted-foreground">Datasets Processed</div>
          </div>
          <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <BarChart3 className="w-8 h-8 text-success" />
            <div className="text-3xl font-bold">99.9%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
