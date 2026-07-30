"use server";

import React from "react";
import Link from "next/link";
import { getSingleProperty } from "../_actions/getSingleProperty";
import {
  MapPin,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Send,
  Star,
  User,
  Mail,
  Phone,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  const { id } = await params;
  const response = await getSingleProperty(id);
  const property = response?.data;

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="h-16 w-16 rounded-full bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 mb-4">
          <Building2 className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Property Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mt-2 mb-6">
          The property details you are looking for could not be retrieved or no longer exists.
        </p>
        <Button asChild variant="default">
          <Link href="/properties" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>
        </Button>
      </div>
    );
  }

  const defaultImage =
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80";
  const mainImage = property.images?.[0] || defaultImage;
  const isAvailable = property.status === "AVAILABLE";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Navigation / Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>
          <div className="flex items-center gap-3">
            {property.category?.name && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50">
                {property.category.name}
              </span>
            )}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isAvailable
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50"
                  : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50"
              }`}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Hero Section / Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2">
          {/* Main Large Image */}
          <div className="md:col-span-2 relative h-[320px] md:h-[450px] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Sub Images / Secondary Images */}
          <div className="hidden md:flex flex-col gap-4 h-[450px]">
            {property.images && property.images.length > 1 ? (
              property.images.slice(1, 5).map((imgUrl: string, idx: number) => (
                <div
                  key={idx}
                  className="relative flex-1 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800"
                >
                  <img
                    src={imgUrl}
                    alt={`${property.title} preview ${idx + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))
            ) : (
              <div className="flex-1 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-6 text-center text-slate-400">
                <Sparkles className="h-8 w-8 text-indigo-400 mb-2" />
                <p className="text-xs">Verified Rental Nest Listing</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Property Info & Details) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Title & Location */}
            <div className="space-y-3 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm md:text-base">
                <MapPin className="h-5 w-5 text-rose-500 shrink-0" />
                <span>{property.address}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                About this property
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  What this place offers
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                    >
                      <Sparkles className="h-4 w-4 text-indigo-500 shrink-0" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 capitalize">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Landlord Info */}
            {property.landlord && (
              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold">
                  <ShieldCheck className="h-5 w-5" />
                  <span>Hosted by</span>
                </div>

                <div className="flex items-start gap-4 pt-2">
                  <div className="h-14 w-14 rounded-2xl overflow-hidden bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-300 shrink-0 border border-indigo-200 dark:border-indigo-800/60">
                    {property.landlord.profile?.avatar &&
                    property.landlord.profile.avatar !== "https://google.com" ? (
                      <img
                        src={property.landlord.profile.avatar}
                        alt={property.landlord.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-7 w-7" />
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {property.landlord.name}
                    </h4>
                    {property.landlord.profile?.bio && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {property.landlord.profile.bio}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400">
                      {property.landlord.email && (
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          <span>{property.landlord.email}</span>
                        </div>
                      )}
                      {property.landlord.profile?.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          <span>{property.landlord.profile.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <span>Reviews ({property.reviews?.length || 0})</span>
                </h3>
              </div>

              {property.reviews && property.reviews.length > 0 ? (
                <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
                  {property.reviews.map((review: any) => (
                    <div key={review.id} className="pt-4 first:pt-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {review.tenant?.name || "Verified Tenant"}
                        </span>
                        <div className="flex items-center text-amber-400">
                          <Star className="h-3.5 w-3.5 fill-amber-400" />
                          <span className="text-xs font-bold ml-1 text-slate-700 dark:text-slate-300">
                            {review.rating || 5}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 dark:text-slate-500 italic py-2">
                  No reviews yet for this property listing.
                </p>
              )}
            </div>

          </div>

          {/* Right Column (Rental Summary & Submit Request Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
              
              {/* Price Tag */}
              <div className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-6">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Rental Price
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-black text-indigo-600 dark:text-indigo-400">
                    ${Number(property.price).toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    / month
                  </span>
                </div>
              </div>

              {/* Status Notice */}
              <div
                className={`p-4 rounded-2xl text-xs font-medium flex items-center gap-3 ${
                  isAvailable
                    ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40"
                    : "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40"
                }`}
              >
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>
                  {isAvailable
                    ? "This property is ready for immediate booking request."
                    : "This property is currently unavailable for rental requests."}
                </span>
              </div>

              {/* Submit Request Button */}
              <form
                action={async () => {
                  "use server";
                }}
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={!isAvailable}
                  className="w-full h-12 text-sm font-semibold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Submit Request
                </Button>
              </form>

              {/* Features List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>Direct contact with verified landlord</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>No hidden booking or application fees</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}