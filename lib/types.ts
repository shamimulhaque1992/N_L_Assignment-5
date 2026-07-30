export type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUserData;
};

export interface IUserData {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  status: "UNBAN" | "BAN";
  createdAt: string;
  updatedAt: string;
  profile: IProfile;
}

export interface IProfile {
  id: string;
  avatar: string;
  bio: string;
  phone: string;
  userId: string;
  createAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILandlordProfile {
  id?: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  userId?: string;
  createAt?: string;
  updatedAt?: string;
}

export interface ILandlord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  profile?: ILandlordProfile;
}

export interface IReview {
  id?: string;
  rating?: number;
  comment?: string;
  userId?: string;
  createdAt?: string;
}

export interface IProperty {
  id: string;
  title: string;
  description: string;
  price: string | number;
  address: string;
  amenities: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  landlordId: string;
  category: ICategory;
  landlord: ILandlord;
  reviews?: IReview[];
  images?: string[];
}
export type Review = {
  id: string;
  tenantId: string;
  propertyId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  tenant: {
    id: string;
    name: string;
    email: string;
    role: "TENANT";
    status: "UNBAN";
    createdAt: string;
    updatedAt: string;
    profile: {
      id: string;
      avatar: string;
      bio: string;
      phone: string;
      userId: string;
      createAt: string;
      updatedAt: string;
    };
  };
};