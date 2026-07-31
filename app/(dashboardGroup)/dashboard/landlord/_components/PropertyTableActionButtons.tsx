"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateAProperty } from "../_actions/updateAProperty";
import { deleteAProperty } from "../_actions/deleteAProperty";

type Category = {
  id: string;
  name: string;
};

type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  category: {
    id: string;
    name: string;
  };
  [key: string]: unknown;
};

type Props = {
  item: Property;
  categories: Category[];
};

// ─── Delete Button ────────────────────────────────────────────────────────────

function DeleteButton({
  propertyId,
  onClose,
}: {
  propertyId: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    deleteAProperty.bind(null, null, propertyId),
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Property deleted successfully");
      onClose();
      router.refresh();
    } else {
      toast.error(state.message || "Failed to delete property");
    }
  }, [state, router, onClose]);

  return (
    <Button
      variant="destructive"
      disabled={pending}
      onClick={() => startTransition(action)}
    >
      {pending ? "Deleting..." : "Delete"}
    </Button>
  );
}

// ─── Update Form ──────────────────────────────────────────────────────────────

function UpdatePropertyForm({
  item,
  categories,
  onClose,
}: {
  item: Property;
  categories: Category[];
  onClose: () => void;
}) {
  console.log("🚀 ~ UpdatePropertyForm ~ item:", item);
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
      onClose();
      router.refresh();
    } else {
      toast.error(state.message || "Failed to update property");
    }
  }, [state, router, onClose]);

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
          defaultValue={item.location}
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
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={pending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const PropertyTableActionButtons = ({ item, categories }: Props) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Edit button */}
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5"
          onClick={() => setUpdateOpen(true)}
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Button>

        {/* Delete button */}
        <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-1.5"
          onClick={() => setDeleteOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>

      {/* ── Update Modal ── */}
      <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
            <DialogDescription>
              Update the details of your property listing.
            </DialogDescription>
          </DialogHeader>
          <UpdatePropertyForm
            item={item}
            categories={categories}
            onClose={() => setUpdateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Modal ── */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {item.title}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <DeleteButton
              propertyId={item.id}
              onClose={() => setDeleteOpen(false)}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyTableActionButtons;
