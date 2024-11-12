export interface SubNavItem {
    name: string;
    path: string;
  }
  
  export interface NavItem {
    name: string;
    path: string;
    subNav?: SubNavItem[]; 
  }
  