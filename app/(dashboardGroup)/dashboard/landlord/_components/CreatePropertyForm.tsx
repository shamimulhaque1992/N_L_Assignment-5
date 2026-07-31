"use client";

import { useActionState, useEffect, useState } from "react";
import { createANewProperty } from "../_actions/createAProperty";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

interface CreatePropertyFormProps {
  categories: Category[];
}

export default function CreatePropertyForm({
  categories,
}: CreatePropertyFormProps) {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState("");
  const [state, action, pending] = useActionState(createANewProperty, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Property created successfully");
      router.push("/dashboard/landlord/properties");
    } else {
      toast.error(state.message || "Failed to create property");
    }
  }, [state, router]);

  return (
    <form action={action} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Property Title <span className="text-rose-500">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. Peaceful Country Cottage"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-rose-500">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe your property..."
          rows={4}
          required
        />
      </div>

      {/* Price & Category — two columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="price">
            Price (per month, $) <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            placeholder="e.g. 700"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoryId">
            Category <span className="text-rose-500">*</span>
          </Label>
          {/* Hidden input so the form submission picks up categoryId */}
          <input type="hidden" name="categoryId" value={categoryId} />
          <Select
            required
            onValueChange={(val) => setCategoryId(val)}
            value={categoryId}
          >
            <SelectTrigger id="categoryId" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">
          Address <span className="text-rose-500">*</span>
        </Label>
        <Input
          id="address"
          name="address"
          placeholder="e.g. 56 Meadow Lane, Lancaster, PA 17601"
          required
        />
      </div>

      {/* Amenities */}
      <div className="space-y-2">
        <Label htmlFor="amenities">
          Amenities{" "}
          <span className="text-xs text-muted-foreground font-normal">
            (comma-separated)
          </span>
        </Label>
        <Input
          id="amenities"
          name="amenities"
          placeholder="e.g. Garden, WiFi, Parking, BBQ Area"
        />
      </div>

      {/* Images */}
      <div className="space-y-2">
        <Label htmlFor="images">
          Image URLs{" "}
          <span className="text-xs text-muted-foreground font-normal">
            (comma-separated)
          </span>
        </Label>
        <Input
          id="images"
          name="images"
          placeholder="e.g. https://example.com/image1.jpg"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={pending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create Property"}
        </Button>
      </div>
    </form>
  );
}
