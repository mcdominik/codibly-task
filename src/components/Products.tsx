import { Box, Grid } from "@chakra-ui/react";
import { Product } from "../models/product";
import ProductTile from "./ProductTile";

interface Props {
  products: Product[];
}

function Products({ products }: Props) {
  return (
    <Box padding={"1rem"} overflow="scroll" maxH="58vh">
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {products.map((product) => (
          <ProductTile
            key={product.id}
            name={product.name}
            color={product.color}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default Products;
