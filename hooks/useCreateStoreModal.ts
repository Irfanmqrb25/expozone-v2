import { create } from "zustand";

interface CreateStoreModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateStoreModal = create<CreateStoreModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateStoreModal;
