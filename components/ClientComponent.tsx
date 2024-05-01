"use client";
import { useState, useEffect } from "react";

interface ClientComponentProps {
  children: React.ReactNode;
}

const ClientComponent: React.FC<ClientComponentProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientComponent;
