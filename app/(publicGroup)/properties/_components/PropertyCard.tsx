"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Tag,
  CheckCircle2,
  Phone,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { IProperty } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PropertyCardProps {
  property: IProperty;
}

// Fallback high-res cover images based on category or default
const DEFAULT_IMAGES: Record<string, string> = {
  Mountain:
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  Apartment:
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  Villa:
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
  Beachfront:
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
  Default:
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
};

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const categoryName = property.category?.name || "Property";
  const coverImage =
    property.images && property.images.length > 0
      ? property.images[0]
      : DEFAULT_IMAGES[categoryName] || DEFAULT_IMAGES.Default;

  // Landlord avatar check
  const avatarUrl = property.landlord?.profile?.avatar;
  const isValidAvatar =
    avatarUrl &&
    avatarUrl.startsWith("http") &&
    !avatarUrl.includes("google.com");

  const landlordInitials = property.landlord?.name
    ? property.landlord.name.substring(0, 2).toUpperCase()
    : "LL";

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/90">
      <div>
        {/* Image & Badges Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src={coverImage}
            alt={property.title}
            width={100}
            height={100}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Category Badge */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm dark:bg-slate-900/90 dark:text-slate-200">
            <Tag className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{categoryName}</span>
          </div>

          {/* Status Badge */}
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500/90 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span className="capitalize">{property.status.toLowerCase()}</span>
          </div>

          {/* Price Tag Overlay */}
          <div className="absolute bottom-3 left-3 flex items-baseline gap-1 rounded-lg bg-black/40 backdrop-blur-md px-3 py-1.5 text-white">
            <span className="text-xl font-bold tracking-tight">
              ৳{property.price}
            </span>
            <span className="text-xs text-slate-200 font-medium">/ month</span>
          </div>
        </div>

        {/* Content Area */}
        <CardHeader className="p-5 pb-2">
          <div className="space-y-1">
            <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400">
              {property.title}
            </h3>
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-500" />
              <span className="line-clamp-1">{property.address}</span>
            </p>
          </div>
        </CardHeader>

        <CardContent className="px-5 py-2 space-y-3">
          {/* Description */}
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {property.description}
          </p>

          {/* Amenities Pills */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {property.amenities.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                >
                  <Sparkles className="h-3 w-3 text-indigo-500" />
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          )}
        </CardContent>
      </div>

      {/* Footer Area: Landlord Info & Details Button */}
      <CardFooter className="flex items-center justify-between border-t border-slate-100 px-5 py-3.5 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 mt-4">
        {/* Landlord Info */}
        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
            {isValidAvatar ? (
              <AvatarImage
                src={avatarUrl}
                alt={property.landlord?.name || "Landlord"}
              />
            ) : null}
            <AvatarFallback className="bg-indigo-600 text-[11px] font-bold text-white">
              {landlordInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
              {property.landlord?.name || "Landlord"}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              {property.landlord?.profile?.phone || "Verified Host"}
            </span>
          </div>
        </div>

        {/* View Details Link */}
        <Link
          href={`/properties/${property.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-indigo-700 hover:shadow-md active:scale-95"
        >
          <span>Details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
