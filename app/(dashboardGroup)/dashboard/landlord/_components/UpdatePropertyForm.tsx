"use client";

import { useActionState, useEffect, useState } from "react";
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
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateAProperty } from "../_actions/updateAProperty";
import { Category, Property } from "./PropertyTableActionButtons";

const UpdatePropertyForm = ({
  item,
  categories,
}: {
  item: Property;
  categories: Category[];
}) => {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState(item.category?.id ?? "");

  const [state, action, pending] = useActionState(
    updateAProperty.bind(null, item.id),
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Property updated successfully");

      router.refresh();
    } else {
      toast.error(state.message || "Failed to update property");
    }
  }, [state, router]);

  return (
    <form action={action} className="space-y-4">
      {/* Title */}
      <div className="space-y-1">
        <Label htmlFor="update-title">
          Title <span className="text-rose-500">*</span>
        </Label>
        <Input
          id="update-title"
          name="title"
          defaultValue={item.title}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <Label htmlFor="update-description">
          Description <span className="text-rose-500">*</span>
        </Label>
        <Textarea
          id="update-description"
          name="description"
          defaultValue={item.description as string}
          rows={3}
          required
        />
      </div>

      {/* Price & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="update-price">
            Price ($/month) <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="update-price"
            name="price"
            type="number"
            min={0}
            defaultValue={item.price}
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="update-category">
            Category <span className="text-rose-500">*</span>
          </Label>
          <input type="hidden" name="categoryId" value={categoryId} />
          <Select
            value={categoryId}
            onValueChange={(val) => setCategoryId(val)}
          >
            <SelectTrigger id="update-category" className="w-full">
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
      <div className="space-y-1">
        <Label htmlFor="update-address">
          Address <span className="text-rose-500">*</span>
        </Label>
        <Input
          id="update-address"
          name="address"
          defaultValue={item.location as string}
          required
        />
      </div>

      {/* Amenities */}
      <div className="space-y-1">
        <Label htmlFor="update-amenities">
          Amenities{" "}
          <span className="text-xs text-muted-foreground font-normal">
            (comma-separated)
          </span>
        </Label>
        <Input
          id="update-amenities"
          name="amenities"
          defaultValue={item.amenities?.join(", ")}
          placeholder="e.g. WiFi, Parking, Garden"
        />
      </div>

      {/* Images */}
      <div className="space-y-1">
        <Label htmlFor="update-images">
          Image URLs{" "}
          <span className="text-xs text-muted-foreground font-normal">
            (comma-separated)
          </span>
        </Label>
        <Input
          id="update-images"
          name="images"
          defaultValue={(item.images as string[])?.join(", ")}
          placeholder="e.g. https://example.com/img.jpg"
        />
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpdatePropertyForm;
