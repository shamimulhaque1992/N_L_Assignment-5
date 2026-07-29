"use server";

import React from "react";
import { IProperty } from "@/lib/types";
import PropertyCard from "./PropertyCard";
import PropertyScalliton from "./PropertyScalliton";
import { Building2, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { getAllProperties } from "../_actions/getAllProperties";

// Dummy data array requested by user
// const result: IProperty[] = [
//   {
//     id: "cf2965cf-6d43-4365-92d6-9024030868a8",
//     title: "Cozy Mountain Cabin",
//     description: "Peaceful wooden cabin surrounded by nature.",
//     price: "900",
//     address: "210 Pine Road, Aspen, CO 81611",
//     amenities: ["Fireplace", "Hiking Trails", "WiFi", "Parking"],
//     status: "AVAILABLE",
//     createdAt: "2026-07-07T20:27:52.192Z",
//     updatedAt: "2026-07-07T20:27:52.192Z",
//     categoryId: "5e57f996-8f02-4981-90a4-4e6eeb575711",
//     landlordId: "10520e62-27c4-4f55-a052-c58d8bfb581c",
//     category: {
//       id: "5e57f996-8f02-4981-90a4-4e6eeb575711",
//       name: "Mountain",
//       createdAt: "2026-07-07T20:23:18.648Z",
//       updatedAt: "2026-07-07T20:23:18.648Z",
//     },
//     landlord: {
//       id: "10520e62-27c4-4f55-a052-c58d8bfb581c",
//       name: "RAFIUE",
//       email: "shamimulhaquSDe+1kashfee@gmail.com",
//       role: "LANDLORD",
//       status: "UNBAN",
//       createdAt: "2026-07-06T12:30:01.686Z",
//       updatedAt: "2026-07-06T12:30:01.686Z",
//       profile: {
//         id: "bff20634-2d1c-443d-8249-66ad2c9721c5",
//         avatar: "https://google.com",
//         bio: "demo bio for kashfee",
//         phone: "01779312970",
//         userId: "10520e62-27c4-4f55-a052-c58d8bfb581c",
//         createAt: "2026-07-06T12:30:01.686Z",
//         updatedAt: "2026-07-06T12:30:01.686Z",
//       },
//     },
//     reviews: [],
//     images: [
//       "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
//     ],
//   },
//   {
//     id: "a1b2c3d4-e5f6-7890-abcd-123456789012",
//     title: "Luxury Downtown Loft",
//     description:
//       "Modern open-concept penthouse with panoramic skyline views and high-end finishes.",
//     price: "2400",
//     address: "742 Evergreen Terrace, New York, NY 10001",
//     amenities: ["Elevator", "Gym", "Doorman", "Pet Friendly", "Balcony"],
//     status: "AVAILABLE",
//     createdAt: "2026-07-08T10:15:30.000Z",
//     updatedAt: "2026-07-08T10:15:30.000Z",
//     categoryId: "6f68a007-9g03-5092-a1b5-5f7ffc686822",
//     landlordId: "20631f73-38d5-5g66-b163-20631f7338d5",
//     category: {
//       id: "6f68a007-9g03-5092-a1b5-5f7ffc686822",
//       name: "Apartment",
//       createdAt: "2026-07-08T10:00:00.000Z",
//       updatedAt: "2026-07-08T10:00:00.000Z",
//     },
//     landlord: {
//       id: "20631f73-38d5-5g66-b163-20631f7338d5",
//       name: "Sarah Jenkins",
//       email: "sarah.j@example.com",
//       role: "LANDLORD",
//       status: "UNBAN",
//       createdAt: "2026-07-05T09:00:00.000Z",
//       updatedAt: "2026-07-05T09:00:00.000Z",
//       profile: {
//         id: "cgg30745-3e2d-55ee-9350-d6e43d9831d6",
//         avatar:
//           "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
//         bio: "Premium property manager in NYC.",
//         phone: "+1 212-555-0199",
//         userId: "20631f73-38d5-5g66-b163-20631f7338d5",
//         createAt: "2026-07-05T09:00:00.000Z",
//         updatedAt: "2026-07-05T09:00:00.000Z",
//       },
//     },
//     reviews: [],
//     images: [
//       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
//     ],
//   },
//   {
//     id: "b2c3d4e5-f6a7-8901-bcde-234567890123",
//     title: "Oceanfront Sunset Villa",
//     description:
//       "Direct beach access villa featuring a private infinity pool, outdoor patio, and ocean breeze.",
//     price: "3800",
//     address: "101 Coastal Highway, Malibu, CA 90265",
//     amenities: ["Pool", "Beach Access", "Air Conditioning", "Hot Tub", "BBQ"],
//     status: "AVAILABLE",
//     createdAt: "2026-07-09T14:20:10.000Z",
//     updatedAt: "2026-07-09T14:20:10.000Z",
//     categoryId: "7g79b118-0h04-6103-b2c6-6g8ggd797933",
//     landlordId: "30742g84-49e6-6h77-c274-30742g8449e6",
//     category: {
//       id: "7g79b118-0h04-6103-b2c6-6g8ggd797933",
//       name: "Villa",
//       createdAt: "2026-07-09T14:00:00.000Z",
//       updatedAt: "2026-07-09T14:00:00.000Z",
//     },
//     landlord: {
//       id: "30742g84-49e6-6h77-c274-30742g8449e6",
//       name: "Marcus Vance",
//       email: "marcus.vance@example.com",
//       role: "LANDLORD",
//       status: "UNBAN",
//       createdAt: "2026-07-04T08:30:00.000Z",
//       updatedAt: "2026-07-04T08:30:00.000Z",
//       profile: {
//         id: "dhh40856-4f3e-66ff-0461-e7f54ea942e7",
//         avatar:
//           "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
//         bio: "Luxury retreat Specialist.",
//         phone: "+1 310-555-0142",
//         userId: "30742g84-49e6-6h77-c274-30742g8449e6",
//         createAt: "2026-07-04T08:30:00.000Z",
//         updatedAt: "2026-07-04T08:30:00.000Z",
//       },
//     },
//     reviews: [],
//     images: [
//       "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
//     ],
//   },
//   {
//     id: "c3d4e5f6-a7b8-9012-cdef-345678901234",
//     title: "Serene Lakefront Cottage",
//     description:
//       "Charming cottage with private dock, fireplace, and scenic forest water views.",
//     price: "1250",
//     address: "55 Shoreline Drive, Lake Tahoe, CA 96150",
//     amenities: ["Kayaks Included", "Dock", "Fireplace", "Deck", "WiFi"],
//     status: "AVAILABLE",
//     createdAt: "2026-07-10T08:00:00.000Z",
//     updatedAt: "2026-07-10T08:00:00.000Z",
//     categoryId: "5e57f996-8f02-4981-90a4-4e6eeb575711",
//     landlordId: "10520e62-27c4-4f55-a052-c58d8bfb581c",
//     category: {
//       id: "5e57f996-8f02-4981-90a4-4e6eeb575711",
//       name: "Mountain",
//       createdAt: "2026-07-07T20:23:18.648Z",
//       updatedAt: "2026-07-07T20:23:18.648Z",
//     },
//     landlord: {
//       id: "10520e62-27c4-4f55-a052-c58d8bfb581c",
//       name: "RAFIUE",
//       email: "shamimulhaquSDe+1kashfee@gmail.com",
//       role: "LANDLORD",
//       status: "UNBAN",
//       createdAt: "2026-07-06T12:30:01.686Z",
//       updatedAt: "2026-07-06T12:30:01.686Z",
//       profile: {
//         id: "bff20634-2d1c-443d-8249-66ad2c9721c5",
//         avatar: "https://google.com",
//         bio: "demo bio for kashfee",
//         phone: "01779312970",
//         userId: "10520e62-27c4-4f55-a052-c58d8bfb581c",
//         createAt: "2026-07-06T12:30:01.686Z",
//         updatedAt: "2026-07-06T12:30:01.686Z",
//       },
//     },
//     reviews: [],
//     images: [
//       "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
//     ],
//   },
// ];



export const  AllPropertiesList = async() => {
    const result = await getAllProperties()
    console.log(result,"result")
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

//   // Simulate initial network load
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 600);
//     return () => clearTimeout(timer);
//   }, []);

//   // Filter logic
//   const filteredProperties = result.filter((property) => {
//     const matchesSearch =
//       property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       property.description.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       selectedCategory === "ALL" ||
//       property.category?.name?.toUpperCase() === selectedCategory.toUpperCase();

//     return matchesSearch && matchesCategory;
//   });

//   const categories = [
//     "ALL",
//     ...Array.from(
//       new Set(result.map((item) => item.category?.name).filter(Boolean))
//     ),
//   ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-8 md:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md text-indigo-200 border border-white/10">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Discover Top Destinations</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Explore Places to Stay
          </h1>
          <p className="text-indigo-100/80 text-sm md:text-base leading-relaxed">
            Find cabins, apartments, villas, and modern homes tailored to your journey.
          </p>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-32 -bottom-20 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl" />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, location, or description..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <SlidersHorizontal className="h-4 w-4 text-slate-400 hidden sm:block shrink-0 ml-1" />
          {/* {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all shrink-0 ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))} */}
        </div>
      </div>

      {/* Content Grid / Skeleton / Empty state */}
      {false ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PropertyScalliton count={6} />
        </div>
      ) : result.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
          <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
            <Building2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            No properties found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
            Try tweaking your search term or select a different category filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllPropertiesList;
