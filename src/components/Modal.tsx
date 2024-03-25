import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { Product } from "../models/product";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ProductModal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Product details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg">id: {product.id}</Text>
          <Text fontSize="lg">name: {product.name}</Text>
          <Text fontSize="lg">color: {product.color}</Text>
          <Text fontSize="lg">year: {product.year}</Text>
          <Text fontSize="lg">pantone: {product.pantone_value}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
