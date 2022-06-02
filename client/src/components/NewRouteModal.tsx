import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@hope-ui/solid';
import { Component, createSignal } from 'solid-js';

interface NewRouteModalProps {
  isOpen: () => boolean;
  onClose: () => void;
  onAddRoute: (data: { title: string; slug: string }) => Promise<void>;
}

const NewRouteModal: Component<NewRouteModalProps> = ({ isOpen, onClose, onAddRoute }) => {
  const [route, setRoute] = createSignal({
    title: '',
    slug: '',
  });
  const handleChange = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;
    setRoute({ ...route(), [name]: value });
  };
  const handleClick = async (e: MouseEvent) => {
    await onAddRoute(route());
    onClose();
  };
  return (
    <Modal opened={isOpen()} onClose={onClose} initialFocus="#title">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Add new route</ModalHeader>
        <ModalBody>
          <VStack>
            <FormControl>
              <FormLabel for="title">Page title</FormLabel>
              <Input
                id="title"
                name="title"
                type="text"
                value={route().title}
                onChange={handleChange}
              />
              <FormHelperText>The wording that appears in a browser tab</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel for="slug">Slug</FormLabel>
              <Input
                id="slug"
                name="slug"
                type="text"
                value={route().slug}
                onChange={handleChange}
              />
              <FormHelperText>This is the bit at the end of a URL</FormHelperText>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClick}>Add Route</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewRouteModal;
