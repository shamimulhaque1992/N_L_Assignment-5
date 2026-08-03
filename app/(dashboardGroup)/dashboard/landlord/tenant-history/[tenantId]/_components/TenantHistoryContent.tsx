import { ArrowLeft, Mail, Phone, User, Calendar, Star } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getTenantHistory } from "../../../_actions/getTenantHistory";
import { TenantHistoryData } from "@/lib/types";
import Image from "next/image";
import AppStatusBadge from "@/components/shared/AppBadge";

const TenantHistoryContent = async ({ tenantId }: { tenantId: string }) => {
  const result = await getTenantHistory(tenantId);
  const data: TenantHistoryData = result?.data;
  const {
    tenant,
    rentalHistory,
    reviewHistory,
    totalRentals,
    completedRentals,
    totalReviews,
  } = data;

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      COMPLETED:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-600",
      ACTIVE:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-600",
      PENDING:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-600",
      CANCELLED:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-600",
      REJECTED:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-600",
    };
    return (
      colors[status] ||
      "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-600"
    );
  };

  return (
    <div className="space-y-6 w-full">
      {/* Back Button */}
      <Link
        href="/dashboard/landlord/requests"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Requests
      </Link>

      {/* Tenant Profile Card */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Tenant Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex justify-center md:justify-start">
              <Avatar className="h-20 w-20 md:h-24 md:w-24">
                <AvatarImage src={tenant.profile.avatar} alt={tenant.name} />
                <AvatarFallback className="text-xl md:text-2xl">
                  {tenant.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 space-y-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-semibold break-words">
                  {tenant.name}
                </h3>
                <AppStatusBadge status={tenant.status} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="flex items-center gap-2 text-sm break-all">
                  <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="break-all">{tenant.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>{tenant.profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>{tenant.role}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>
                    Joined {new Date(tenant.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              {tenant.profile.bio && (
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground break-words">
                    {tenant.profile.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Rentals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl md:text-3xl font-bold">{totalRentals}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Rentals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl md:text-3xl font-bold">{completedRentals}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl md:text-3xl font-bold">{totalReviews}</p>
          </CardContent>
        </Card>
      </div>

      {/* Rental History */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Rental History</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {rentalHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No rental history available
            </p>
          ) : (
            <div className="space-y-4">
              {rentalHistory.map((rental) => (
                <div
                  key={rental.id}
                  className="border rounded-lg p-3 md:p-4 space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 flex-1">
                      {rental.property.images[0] && (
                        <Image
                          height={50}
                          width={50}
                          src={rental.property.images[0]}
                          alt={rental.property.title}
                          className="w-full sm:w-20 h-40 sm:h-20 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="space-y-1 flex-1 min-w-0">
                        <h4 className="font-semibold text-sm md:text-base break-words">
                          {rental.property.title}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground break-words">
                          {rental.property.address}
                        </p>
                        <AppStatusBadge
                          status={rental.property.category.name}
                        />
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:text-right">
                      <AppStatusBadge status={rental.status} />
                      <p className="text-base md:text-lg font-bold whitespace-nowrap">
                        ৳{rental.property.price}
                      </p>
                    </div>
                  </div>

                  {rental.payment && (
                    <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                      <p className="text-xs md:text-sm font-medium">
                        Payment Details
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                        <div className="break-words">
                          <span className="text-muted-foreground">Amount:</span>{" "}
                          ৳{rental.payment.amount}
                        </div>
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="text-muted-foreground">Status:</span>{" "}
                          <AppStatusBadge status={rental.payment.status} />
                        </div>
                        <div>
                          <span className="text-muted-foreground">Method:</span>{" "}
                          {rental.payment.method}
                        </div>
                        <div className="break-words">
                          <span className="text-muted-foreground">
                            Paid On:
                          </span>{" "}
                          {new Date(rental.payment.paidAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground pt-2 border-t">
                    <span>
                      Requested:{" "}
                      {new Date(rental.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      Updated: {new Date(rental.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review History */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Review History</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {reviewHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No reviews available
            </p>
          ) : (
            <div className="space-y-4">
              {reviewHistory.map((review) => (
                <div
                  key={review.id}
                  className="border rounded-lg p-3 md:p-4 space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    {review?.property?.images?.[0] && (
                      <Image
                        height={50}
                        width={50}
                        src={review.property?.images[0]}
                        alt={review.property?.title}
                        className="w-full sm:w-20 h-40 sm:h-20 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm md:text-base break-words">
                            {review.property?.title}
                          </h4>
                          <p className="text-xs md:text-sm text-muted-foreground break-words">
                            {review.property?.address}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm break-words">
                        {review.comment}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {review?.createdAt
                          ? new Date(
                              review?.createdAt as string,
                            ).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantHistoryContent;
