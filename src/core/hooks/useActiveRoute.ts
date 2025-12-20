import { useLocation } from "react-router";

export function useActiveRoute() {
  const location = useLocation();

  const isActive = (url: string): boolean => {
    if (url === "#") {
      return false;
    }

    return location.pathname === url;
  };

  const isParentActive = (subItems?: Array<{ url: string }>): boolean => {
    if (!subItems || subItems.length === 0) {
      return false;
    }

    return subItems.some((subItem) => location.pathname === subItem.url);
  };

  return {
    isActive,
    isParentActive,
  };
}
