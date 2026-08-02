import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  CreditCard,
  LayoutDashboard,
  Search,
  Sparkles,
  Star,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white overflow-hidden">
      {/* background blobs - just for some depth */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 border border-white/10 bg-white/10 rounded-full px-4 py-1 text-xs text-indigo-200 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          Your next desired property is just a search away
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Find Your Perfect
          <span className="text-indigo-300">Rental Property</span>
        </h1>

        <p className="text-indigo-100/75 max-w-xl mx-auto mb-8">
          Browse hundreds of verified properties — apartments, villas, cabins
          and more — with secure Stripe payments and a full dashboard.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10">
          <Link
            href="/properties"
            className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 rounded-xl px-6 py-3 text-sm font-semibold transition"
          >
            <Search className="w-4 h-4" />
            Browse All Properties
          </Link>

          <Link
            href="/auth/login"
            className="flex items-center justify-center gap-2 border border-white/20 bg-white/10 hover:bg-white/20 rounded-xl px-6 py-3 text-sm font-semibold transition"
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to Dashboard
          </Link>
        </div>

        {/* stats - just hardcoded for now, can map later if needed */}
        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-1.5 border border-white/10 bg-white/10 rounded-full px-3 py-1 text-xs text-indigo-200">
            <Building2 className="w-3.5 h-3.5" />
            500+ Properties
          </div>
          <div className="flex items-center gap-1.5 border border-white/10 bg-white/10 rounded-full px-3 py-1 text-xs text-indigo-200">
            <BadgeCheck className="w-3.5 h-3.5" />
            Verified Listings
          </div>
          <div className="flex items-center gap-1.5 border border-white/10 bg-white/10 rounded-full px-3 py-1 text-xs text-indigo-200">
            <CreditCard className="w-3.5 h-3.5" />
            Stripe Payments
          </div>
          <div className="flex items-center gap-1.5 border border-white/10 bg-white/10 rounded-full px-3 py-1 text-xs text-indigo-200">
            <Star className="w-3.5 h-3.5" />
            Top Rated Hosts
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
