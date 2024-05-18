"use client";

import useCreateStoreModal from "@/hooks/useCreateStoreModal";
import { Button } from "./ui/button";
import { useCallback } from "react";

const CreateStoreButton = () => {
  const createStoreModal = useCreateStoreModal();

  const onCreateStoreModal = useCallback(() => {
    createStoreModal.onOpen();
  }, [createStoreModal]);

  return (
    <Button size="sm" onClick={onCreateStoreModal}>
      Buat Toko
    </Button>
  );
};

export default CreateStoreButton;
