import {
  CheckCircle2,
  DollarSign,
  Home,
  Clock3,
  CreditCard,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSinglePaymentHistory } from "../../_actions/getSinglePaymentHistory";

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between py-2.5 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

const Section = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
      {icon}
      {title}
    </div>
    <div className="divide-y">{children}</div>
  </div>
);

interface RentalRequestDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function PaymentDetailsPage({
  params,
}: RentalRequestDetailsPageProps) {
  const { id } = await params;
  const response = await getSinglePaymentHistory(id);
  const payment = response?.data;

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Payment Details</h1>
          <p className="mt-1 text-muted-foreground">
            Complete information about this payment transaction.
          </p>
        </div>

        <Badge className="gap-1.5 border-green-600 bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          {payment.status}
        </Badge>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <DollarSign className="h-5 w-5 text-primary" />
            Amount
          </CardTitle>
          <span className="text-2xl font-bold text-primary">
            ${payment.amount}
          </span>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <Section icon={<CreditCard className="h-4 w-4" />} title="Payment">
            <Row label="Provider" value={payment.provider} />
            <Row label="Method" value={payment.method} />
            <Row
              label="Transaction ID"
              value={
                <span className="font-mono text-xs break-all">
                  {payment.id}
                </span>
              }
            />
          </Section>

          <Section icon={<Home className="h-4 w-4" />} title="Property">
            <Row
              label="Property"
              value={payment.rentalRequest.property.title}
            />
            <Row
              label="Category"
              value={payment.rentalRequest.property.category.name}
            />
            <Row
              label="Address"
              value={payment.rentalRequest.property.address}
            />
          </Section>

          <Section icon={<Clock3 className="h-4 w-4" />} title="Timeline">
            <Row
              label="Paid At"
              value={new Date(payment.paidAt).toLocaleString()}
            />
            <Row label="Rental Status" value={payment.rentalRequest.status} />
            <Row
              label="Created"
              value={new Date(payment.createdAt).toLocaleString()}
            />
          </Section>
        </CardContent>
      </Card>
    </div>
  );
}
