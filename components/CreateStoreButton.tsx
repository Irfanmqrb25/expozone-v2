"use client";

import useCreateStoreModal from "@/hooks/useCreateStoreModal";
import { Button } from "./ui/button";
import { useCallback } from "react";
import { Card } from "./ui/card";

const CreateStoreButton = () => {
  const createStoreModal = useCreateStoreModal();

  const onCreateStoreModal = useCallback(() => {
    createStoreModal.onOpen();
  }, [createStoreModal]);

  return (
    <Button size="sm" onClick={onCreateStoreModal}>
      Create Store
    </Button>
  );
};

export default CreateStoreButton;
