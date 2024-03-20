import axios from "axios";
import { Flex, Input, Button, VStack, HStack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export function App() {
  const [input, setInput] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  function handleInput(event: any) {
    const phrase = event.target.value;
    const onlyIntegers = event.target.value.replace(/[^0-9\-]/g, "");

    if (onlyIntegers != phrase) {
      toast({
        title: "only id (integers) are allowed ",
        status: "error",
      });
      return;
    }
    setInput(onlyIntegers);
    toast.closeAll();
  }

  useEffect(() => {}, [data]);

  return (
    <Flex padding={16} h="100vh" w="100vw" justifyContent={"center"}>
      <VStack w={["100%", "100%", "50%"]}>
        <HStack>
          <Flex>
            <Input onChange={handleInput} placeholder="search..." />
          </Flex>
          <Button mx={4} colorScheme="blue" variant="outline">
            {loading ? <Spinner /> : "check"}
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
}
