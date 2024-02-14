interface Product {
    id: string | null;
    code: string;
    name: string;
    description: string;
    image: string | null;
    price: number;
    category: string | null;
    quantity: number;
    inventoryStatus: string;
    rating: number;
  }