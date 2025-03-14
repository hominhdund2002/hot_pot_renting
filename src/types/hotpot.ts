export interface CreateHotPotFormSchema {
  name: string;
  description: string;
  imageURL: (string | undefined)[] | undefined;
}

export interface CreateHotPotSchema {
  name: string;
  material: string;
  size: string;
  description: string;
  imageURLs: (string | undefined)[] | undefined;
  price: number;
  basePrice: number;
  status: boolean;
  seriesNumbers: (string | undefined)[] | undefined;
}

export const SizeData = [
  {
    id: "S",
    name: "size S",
  },
  {
    id: "M",
    name: "size  M",
  },
  {
    id: "L",
    name: "size L",
  },
];
