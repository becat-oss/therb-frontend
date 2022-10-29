import React from "react";
import { AppProvider } from "src/AppContext";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout(props: LayoutProps): React.ReactElement {
  const { children } = props;

  return (
    <AppProvider>
      <div style={{ 
        display: "grid", 
        width: "100%", 
        height: "97vh",
        gridTemplateRows: "4em 1fr"
        }}>
        <Header />
        {children}
      </div>
    </AppProvider>
  );
}
