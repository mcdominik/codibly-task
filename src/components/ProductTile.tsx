import { Box, HStack, Spacer } from "@chakra-ui/react";
import { ColorValueHex } from "../models/product";

interface Props {
  name: string;
  color: ColorValueHex;
}

function ProductTile({ name, color }: Props) {
  return (
    <Box
      bgColor={color}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding="1em"
    >
      <HStack mb={2}>
        <Spacer />
      </HStack>
      <p>{name}</p>
    </Box>
  );
}

export default ProductTile;
