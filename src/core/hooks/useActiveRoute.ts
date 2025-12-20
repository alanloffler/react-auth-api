import { useLocation } from "react-router";

export function useActiveRoute() {
  const location = useLocation();

  const isActive = (url: string, exact = false): boolean => {
    if (exact) {
      return location.pathname === url;
    }

    if (url === "#") {
      return false;
    }

    return location.pathname === url;
  };

  const isParentActive = (subItems?: Array<{ url: string }>, parentUrl?: string): boolean => {
    if (!subItems || subItems.length === 0) {
      return false;
    }

    const hasActiveChild = subItems.some((subItem) => {
      return location.pathname === subItem.url;
    });

    if (hasActiveChild) {
      return true;
    }

    if (parentUrl && parentUrl !== "#") {
      return location.pathname === parentUrl;
    }

    return false;
  };

  const isSettingsPatternActive = (pattern: string): boolean => {
    if (!pattern.includes("settings")) {
      return isActive(pattern);
    }

    return location.pathname.includes(pattern);
  };

  return {
    isActive,
    isParentActive,
    isSettingsPatternActive,
    pathname: location.pathname,
  };
}
