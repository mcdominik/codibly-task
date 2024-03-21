import { Box, Grid } from "@chakra-ui/react";
import { Product } from "../models/product";
import ProductTile from "./ProductTile";

interface Props {
  products: Product[];
}

function Products({ products }: Props) {
  return (
    <Box overflow="scroll" maxH="58vh">
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={4}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            padding="1em"
          >
            <ProductTile name={product.name} color={product.color} />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default Products;
