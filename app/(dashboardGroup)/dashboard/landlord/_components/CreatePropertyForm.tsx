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
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    price?: string;
    categoryId?: string;
    address?: string;
  }>({});

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Property created successfully");
      router.push("/dashboard/landlord/properties");
    } else {
      toast.error(state.message || "Failed to create property");
    }
  }, [state, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const title = (formData.get("title") as string || "").trim();
    const description = (formData.get("description") as string || "").trim();
    const price = (formData.get("price") as string || "").trim();
    const address = (formData.get("address") as string || "").trim();

    const newErrors: typeof errors = {};

    if (!title) newErrors.title = "Property title is required";
    if (!description) {
      newErrors.description = "Description is required";
    } else if (description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    if (!price || Number(price) <= 0) {
      newErrors.price = "Valid price per month is required";
    }
    if (!categoryId) newErrors.categoryId = "Please select a category";
    if (!address) newErrors.address = "Property address is required";

    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <form action={action} onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Property Title <span className="text-rose-500">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. Peaceful Country Cottage"
        />
        {errors.title && (
          <p className="text-xs text-rose-500">{errors.title}</p>
        )}
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
        />
        {errors.description && (
          <p className="text-xs text-rose-500">{errors.description}</p>
        )}
      </div>

      {/* Price & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="price">
            Price (per month, $) <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={1}
            placeholder="e.g. 700"
          />
          {errors.price && (
            <p className="text-xs text-rose-500">{errors.price}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoryId">
            Category <span className="text-rose-500">*</span>
          </Label>
          <input type="hidden" name="categoryId" value={categoryId} />
          <Select value={categoryId} onValueChange={setCategoryId}>
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
          {errors.categoryId && (
            <p className="text-xs text-rose-500">{errors.categoryId}</p>
          )}
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
        />
        {errors.address && (
          <p className="text-xs text-rose-500">{errors.address}</p>
        )}
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
