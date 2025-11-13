"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SportCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  onClick?: () => void;
}

export function SportCard({ title, description, image, tags, onClick }: SportCardProps) {
  return (
    <Card
      className="group overflow-hidden border-2 border-transparent transition-all duration-300 hover:-translate-y-2 hover:border-accent-orange hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-[250px] overflow-hidden bg-gradient-to-br from-primary-navy to-primary-blue">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-primary-navy">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-primary-blue/20 bg-primary-blue/10 text-primary-blue"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
