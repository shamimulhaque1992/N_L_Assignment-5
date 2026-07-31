import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import UpdatePropertyForm from "./UpdatePropertyForm";
import DeleteAPropertyButton from "./DeletePropertyButton";

export type Category = {
  id: string;
  name: string;
};

export type Property = {
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

const PropertyTableActionButtons = ({ item, categories }: Props) => {
  return (
    <div className="flex justify-start items-center gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
            <DialogDescription>
              Update the details of your property listing.
            </DialogDescription>
          </DialogHeader>
          <UpdatePropertyForm item={item} categories={categories} />
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 bg-red-200 hover:bg-red-300 border-red-200 hover:border-red-300 text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DeleteAPropertyButton propertyId={item.id} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyTableActionButtons;
