import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Heart, Download, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface EbookCardProps {
  id: string;
  title: string;
  category: string;
  price: number;
  coverUrl: string;
  downloads: number;
  resolution?: string; // optional for future use
}


const EbookCard = ({
  id,
  title,
  category,
  price,
  coverUrl,
  downloads,
  resolution = "PDF",
}: EbookCardProps) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/ebook/${id}`);
  };
  return (
    <Card  onClick={handleCardClick}
      className="overflow-hidden border-0 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          draggable="false"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-xs">
            {category}
          </Badge>
        </div>

        {/* PDF Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-accent text-accent-foreground text-xs">
            {resolution}
          </Badge>
        </div>
      </div>

      {/* Ebook Details */}
      <div className="p-4 text-center">
        <h3 className="font-semibold text-base mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">Downloads: {downloads}</p>

      <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ${price}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
        </div>

      </div>
    </Card>
  );
};

export default EbookCard;
