//(ENDPOINT PRODUCT)
export interface ProductRequestBody {
  title: string;
  description: string | null;
  price: number;
  discountPrice: number | null;
  sizes: string[];
  quantity: number | null;
  imageUrl: string;
  category: string[];
  secondaryImages?: string[];
}

export interface ProductFormState {
  title: string;
  description: string | null;
  price: string;
  discountPrice: string;
  sizes: string[];
  quantity: number | null;
  imageUrl: string;
  secondaryImages?: string[];
  category: string[];
}

//Products
export interface ProductNeedId {
  id: string;
  title: string;
  description: string | null;
  price: number;
  discountPrice: number | null;
  sizes: string[];
  quantity: number | null;
  imageUrl: string;
  category: string[];
  secondaryImages?: string[];
}

export interface Product {
  id?: string;
  title: string;
  description: string | null;
  price: number;
  discountPrice: number | null;
  sizes: string[];
  quantity: number | null;
  imageUrl: string;
  category: string[];
  secondaryImages?: string[];
}

export interface EditProductDialogProps {
  product: Product;
  onUpdateProduct: (
    updatedProduct: Product,
    file?: File,
    secondaryFiles?: { [index: number]: File },
    newSecondaryFiles?: File[]
  ) => Promise<Product>;
}

export interface DeleteProductDialogProps {
  product: Product;
  onDeleteProduct: (id: string | undefined) => void;
}

export interface ProductTableProps {
  products: Product[];
  onUpdateProduct: (
    updatedProduct: Product,
    file?: File,
    secondaryFiles?: { [index: number]: File },
    newSecondaryFiles?: File[]
  ) => Promise<Product>;
  onDeleteProduct: (productId: string | undefined) => void;
}
export interface LogoutButtonProps {
  onLogout: () => void;
}

export interface ProductFormProps {
  newProduct: Product;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSizeChange: (size: string, checked: boolean) => void;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddProduct: () => void;
}

export type SingleProductProps = {
  product: Product;
  isMobile?: boolean;
};

//Nav
export interface SubNavItem {
  name: string;
  path: string;
}

export interface NavItem {
  name: string;
  path: string;
  subNav?: SubNavItem[];
}

export interface NavProps {
  navItem: NavItem[];
}

//Trending items
export interface CategoryItemProps {
  imageSrc: string;
  title: string;
  bgType: string;
}
