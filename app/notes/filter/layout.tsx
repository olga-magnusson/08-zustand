import { ReactNode } from "react";


interface LayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function FilterLayout({ children, sidebar }: LayoutProps) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{width: 250}}>{sidebar}</aside>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}