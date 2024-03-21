import { Flex, HStack, Spacer } from "@chakra-ui/react";
import { ColorValueHex } from "../models/product";

interface Props {
  name: string;
  color: ColorValueHex;
}

function ProductTile({ name, color }: Props) {
  return (
    <Flex bgColor={color}>
      <>
        <HStack mb={2}>
          <Spacer />
        </HStack>
        <p>{name}</p>
        <p>{color}</p>
      </>
    </Flex>
  );
}

export default ProductTile;
