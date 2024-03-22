import React from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  Link,
  IconButton,
  Button,
} from "@chakra-ui/react";

const Navbar: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Box fontSize="xl" fontWeight="bold">
          Codibly Task
        </Box>
      </Flex>

      <Box
        display={{ base: "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <Link href="https://codibly.com" mr={5}>
          Codibly Page
        </Link>
        <Link href="https://github.com/mcdominik" mr={5}>
          GitHub Repository
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
