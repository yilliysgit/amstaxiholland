// app/config/links/helpers.ts

export const isActiveRoute = (currentPath: string, linkHref: string): boolean => {
  // ✅ Veiligheidscheck toegevoegd
  if (!linkHref || !currentPath) return false;
  
  const cleanCurrent = currentPath.replace(/\/$/, "") || "/";
  const cleanLink = linkHref.replace(/\/$/, "") || "/";

  if (cleanLink === "/") {
    return cleanCurrent === "/";
  }

  return cleanCurrent === cleanLink || cleanCurrent.startsWith(`${cleanLink}/`);
};