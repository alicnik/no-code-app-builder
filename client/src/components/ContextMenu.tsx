import {
  Box,
  Button,
  createDisclosure,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@hope-ui/solid';
import { Component, Context, ParentProps } from 'solid-js';

interface ContextMenuProps extends ParentProps {
  withArrow?: boolean;
  showCloseButton?: boolean;
  headerText?: string;
}

const ContextMenu: Component<ContextMenuProps> = ({
  children,
  withArrow,
  showCloseButton,
  headerText,
}) => {
  const { isOpen, onOpen, onClose, onToggle } = createDisclosure();
  const handleContextMenuOpen = (e: MouseEvent) => {
    e.preventDefault();
    onOpen();
  };
  return (
    <Popover opened={isOpen()} onClose={onClose} placement="bottom-end">
      <PopoverAnchor as={Box} onContextMenu={handleContextMenuOpen}>
        {children}
      </PopoverAnchor>
      <PopoverContent>
        {withArrow && <PopoverArrow />}
        {showCloseButton && <PopoverCloseButton />}
        {headerText && <PopoverHeader>{headerText}</PopoverHeader>}
        <PopoverBody>
          body
          {/* <Button variant="ghost" onClick={() => handleDeleteRoute(route().id)}>
            Delete route
          </Button> */}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ContextMenu;
