"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  // avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // if not mounted, don't render anything
  if (!isMounted) return null;

  // if mounted, render StoreModal
  return (
    <>
      <StoreModal />
    </>
  );
};
