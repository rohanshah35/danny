
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  actionLink?: string;
}

const DashboardCard = ({
  title,
  className,
  children,
  onClick,
  actionLink,
}: DashboardCardProps) => {
  const CardWrapper = actionLink ? "a" : "div";
  const wrapperProps = actionLink ? { href: actionLink } : {};

  return (
    <CardWrapper {...wrapperProps}>
      <Card 
        className={cn(
          "h-full card-shadow hover-scale transition-all duration-200", 
          onClick && "cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </CardWrapper>
  );
};

export default DashboardCard;
