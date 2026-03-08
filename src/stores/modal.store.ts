import { create } from "zustand";

export type ModalId = "addProduct" | "addUser" | null;

interface ModalState {
  openModalId: ModalId;
  openModal: (id: Exclude<ModalId, null>) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  openModalId: null,
  openModal: (id) => set({ openModalId: id }),
  closeModal: () => set({ openModalId: null }),
}));