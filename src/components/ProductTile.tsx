import { Box, Text } from "@chakra-ui/react";
import { Product } from "../models/product";
import ProductModal from "./Modal";
import { useState } from "react";

interface Props {
  product: Product;
}

function ProductTile({ product }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Box
        _hover={{ cursor: "pointer" }}
        bgColor={product.color}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding="1em"
        onClick={openModal}
      >
        <Text fontSize="md">id: {product.id}</Text>

        <Text fontSize="lg">{product.name}</Text>

        <Text fontSize="xs">{product.year}</Text>
      </Box>
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}

export default ProductTile;
