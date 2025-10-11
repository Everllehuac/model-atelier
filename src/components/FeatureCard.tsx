import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
}

const FeatureCard = ({ icon: Icon, title, description, image }: FeatureCardProps) => {
  return (
    <Card className="group hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 border-border/50 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <div className="flex items-start gap-4">
          {image ? (
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-8 h-8 text-primary" />
            </div>
          )}
          <div>
            <CardTitle className="text-xl mb-2">{title}</CardTitle>
            <CardDescription className="text-base">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default FeatureCard;
