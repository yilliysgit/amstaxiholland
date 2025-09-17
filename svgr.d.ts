// src/types/svgr.d.ts  (of svgr.d.ts in projectroot)
declare module '*.svg' {
  import * as React from 'react';
  const C: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export default C;
}

declare module '*.svg?url' {
  const url: string;
  export default url;
}