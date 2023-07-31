import { useState, useEffect } from 'react';

const useToggleSideBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Función para abrir la barra lateral
  const openSidebar = (): void => {
    setIsOpen(true);
  };

  // Función para cerrar la barra lateral
  const closeSidebar = (): void => {
    setIsOpen(false);
  };

  // Efecto para agregar un "event listener" al evento 'keydown'
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    };
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []); // El efecto se ejecutará solo una vez, cuando el componente se monta

  return { isOpen, openSidebar, closeSidebar };
};

export default useToggleSideBar;
