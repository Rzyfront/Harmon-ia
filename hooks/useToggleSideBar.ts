import create from 'zustand';

interface ToggleProps {
  isOpen: boolean;
  openSidebar:  () => void;
  closeSidebar: () => void;
}

const useToggleSideBar = create<ToggleProps>((set) => ({
  isOpen: false,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
}));

export default useToggleSideBar;