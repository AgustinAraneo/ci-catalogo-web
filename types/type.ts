//(ENDPOINT PRODUCT)
export interface ProductRequestBody {
  title: string;
  price: number;
  sizes: string[];
  quantity: number | null;
}

//Products
export interface Product {
  id?: string;
  title: string;
  price: number;
  sizes: string[];
  quantity: number | null;
}

export interface EditProductDialogProps {
  product: Product;
  onUpdateProduct: (product: Product) => void;
}

export interface DeleteProductDialogProps {
  product: Product;
  onDeleteProduct: (id: string | undefined) => void;
}

export interface ProductTableProps {
  products: Product[];
  onUpdateProduct: (updatedProduct: Product) => void;
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
