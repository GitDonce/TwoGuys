import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function OnboardingCard({ title, icon, children, defaultExpanded = false }: OnboardingCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-medium border-0 shadow-soft",
      isExpanded && "shadow-medium"
    )}>
      <CardHeader className="pb-4">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full h-auto p-0 justify-between hover:bg-transparent group"
        >
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="text-primary group-hover:scale-110 transition-transform">
              {icon}
            </div>
            {title}
          </CardTitle>
          <div className="text-muted-foreground group-hover:text-primary transition-colors">
            {isExpanded ? <ChevronDown /> : <ChevronRight />}
          </div>
        </Button>
      </CardHeader>
      
      <CardContent 
        className={cn(
          "pt-0 transition-all duration-300 overflow-hidden",
          isExpanded ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0"
        )}
      >
        {children}
      </CardContent>
    </Card>
  );
}

interface InfoSectionProps {
  title: string;
  items: string[];
}

export function InfoSection({ title, items }: InfoSectionProps) {
  return (
    <div className="mb-6">
      <h4 className="font-semibold text-primary mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
}

export function LinkButton({ href, children, variant = "outline" }: LinkButtonProps) {
  return (
    <Button 
      variant={variant} 
      size="sm" 
      className="gap-2 hover:scale-105 transition-transform"
      onClick={() => window.open(href, '_blank')}
    >
      {children}
      <ExternalLink className="w-3 h-3" />
    </Button>
  );
}