"use server";

import React from "react";
import Link from "next/link";
import { getSingleRentalRequest } from "@/app/(dashboardGroup)/dashboard/_actions/getSingleRentalRequest";
import {
  ArrowLeft,
  MapPin,
  Sparkles,
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Clock,
  XCircle,
  Building2,
  CheckCircle,
} from "lucide-react";
import PayNowButton from "../../_components/PayNowButton";
import { statusConfig } from "../../_config/statusConfig";

interface RentalRequestDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function RentalRequestDetailsPage({
  params,
}: RentalRequestDetailsPageProps) {
  const { id } = await params;
  const response = await getSingleRentalRequest(id);
  const request = response?.data;

  if (!request) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="h-16 w-16 rounded-full bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 mb-4">
          <Building2 className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Request Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mt-2 mb-6">
          The rental request you are looking for could not be retrieved or no
          longer exists.
        </p>
        <Link
          href="/dashboard/tenant/requests"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Requests
        </Link>
      </div>
    );
  }

  const { property, tenant, payment, status } = request;

  const currentStatus =
    statusConfig[status as keyof typeof statusConfig] ?? statusConfig.PENDING;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const mainImage = property?.images?.[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/dashboard/tenant/requests"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Requests
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Rental Request Details
          </h1>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold w-fit ${currentStatus.badge}`}
          >
            {currentStatus.icon}
            {currentStatus.label}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Property Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Card */}
            {property && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Property Image */}
                {mainImage && (
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      src={mainImage}
                      alt={property.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 space-y-4">
                  {/* Title & Address */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {property.title}
                      </h2>
                      {property.category?.name && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50">
                          {property.category.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
                      <span>{property.address}</span>
                    </div>
                  </div>

                  {/* Description */}
                  {property.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {property.description}
                    </p>
                  )}

                  {/* Amenities */}
                  {property.amenities && property.amenities.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Amenities
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.map(
                          (amenity: string, idx: number) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 capitalize"
                            >
                              <Sparkles className="h-3 w-3 text-indigo-400" />
                              {amenity}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Landlord Info */}
            {property?.landlord && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Landlord
                </h3>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl overflow-hidden bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-300 shrink-0 border border-indigo-200 dark:border-indigo-800/60">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {property.landlord.name}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        <span>{property.landlord.email}</span>
                      </div>
                      {property.landlord.profile?.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{property.landlord.profile.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tenant Info */}
            {tenant && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Tenant
                </h3>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl overflow-hidden bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-300 shrink-0 border border-emerald-200 dark:border-emerald-800/60">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {tenant.name}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        <span>{tenant.email}</span>
                      </div>
                      {tenant.profile?.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{tenant.profile.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rental Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-5">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg p-6 space-y-5">
                <div className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Rental Price
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                      ৳{Number(property?.price ?? 0).toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      / month
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>
                      Submitted:
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        {formatDate(request.createdAt)}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>
                      Updated:
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        {formatDate(request.updatedAt)}
                      </span>
                    </span>
                  </div>
                </div>

                <div>
                  {status === "APPROVED" ? (
                    <PayNowButton rentalRequestId={request.id} />
                  ) : status === "REJECTED" ? (
                    <div className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-600 bg-rose-100 py-3 text-sm font-semibold text-rose-700 dark:border-rose-500 dark:bg-rose-900/30 dark:text-rose-400">
                      <XCircle className="h-4 w-4" />
                      Rejected
                    </div>
                  ) : status === "ACTIVE" ? (
                    <div className="flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-600 bg-blue-100 py-3 text-sm font-semibold text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-400">
                      <CheckCircle className="h-4 w-4" />
                      Active
                    </div>
                  ) : status === "COMPLETED" ? (
                    <div className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-600 bg-slate-100 py-3 text-sm font-semibold text-slate-700 dark:border-slate-500 dark:bg-slate-900/30 dark:text-slate-300">
                      <CheckCircle className="h-4 w-4" />
                      Completed
                    </div>
                  ) : status === "CANCELLED" ? (
                    <div className="flex w-full items-center justify-center gap-2 rounded-2xl border border-orange-600 bg-orange-100 py-3 text-sm font-semibold text-orange-700 dark:border-orange-500 dark:bg-orange-900/30 dark:text-orange-400">
                      <XCircle className="h-4 w-4" />
                      Cancelled
                    </div>
                  ) : (
                    <div className="flex w-full items-center justify-center gap-2 rounded-2xl border border-yellow-600 bg-yellow-100 py-3 text-sm font-semibold text-yellow-700 dark:border-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-400">
                      <Clock className="h-4 w-4" />
                      Pending
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Info Card */}
              {payment && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
                  <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-slate-100">
                    <CreditCard className="h-5 w-5 text-indigo-500" />
                    <span>Payment Info</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">
                        Amount
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        ${Number(payment.amount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">
                        Provider
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                        {payment.provider.toLowerCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">
                        Method
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                        {payment.method.toLowerCase()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400">
                        Status
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          payment.status === "COMPLETED"
                            ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                            : payment.status === "FAILED"
                              ? "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
                              : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>
                    {payment.paidAt && (
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">
                          Paid At
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {formatDate(payment.paidAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
