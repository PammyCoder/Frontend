import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Download, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ImageCardProps {
  id: string;
  title: string;
  category: string;
  price: number;
  resolution: string;
  imageUrl: string;
  downloads: number;
}

const ImageCard = ({ id, title, category, price, resolution, imageUrl, downloads }: ImageCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/image/${id}`);
  };

  return (
    <Card 
      onClick={handleCardClick}
      className="group overflow-hidden border-0 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background transition-colors"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isLiked ? "fill-red-500 text-red-500" : "text-foreground"
                }`}
              />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium">
              <Download className="h-3 w-3" />
              <span>{downloads}</span>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {category}
          </Badge>
        </div>

        {/* Resolution Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-accent text-accent-foreground">
            {resolution}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-base mb-2 line-clamp-1">{title}</h3>
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

export default ImageCard;
