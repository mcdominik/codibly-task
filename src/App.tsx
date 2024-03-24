import axios from "axios";
import { Flex, Input, Button, VStack, HStack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Products from "./components/Products";
import { ColorValueHex, PantoneFormat, Product } from "./models/product";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";

export function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<Product[] | null>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>();

  async function getProductById(id: string) {
    console.log(input);
    setLoading(true);
    const response = await axios.get(`/api/products?id=${id}`).catch((e) => {
      toast.closeAll();
      toast({
        title: e.message,
        status: "error",
      });
    });
    setLoading(false);

    if (!response?.data.data) {
      setData(null);
      return;
    }

    const array: Product[] = [response?.data.data];
    setData(array);
  }

  async function getProductsByPage(page: number) {
    setLoading(true);
    const response = await axios
      .get(`/api/products?page=${page}`)
      .catch((e) => {
        toast.closeAll();
        toast({
          title: e.message,
          status: "error",
        });
      });
    let products = response?.data.data;
    setLoading(false);

    if (!products) {
      setData(null);
      return;
    }
    setData(products);
    setTotalPages(response?.data.totalPages);
    console.log(products);
  }

  function handleInput(event: any) {
    const phrase: string = event.target.value;
    const onlyIntegers = event.target.value.replace(/[^0-9\-]/g, "");

    if (phrase.length > 0 && !phrase.match(/^\d+$/)) {
      toast({
        title: "only id (integers) are allowed ",
        status: "error",
      });
      return;
    }
    toast.closeAll();
    setInput(onlyIntegers);
  }

  useEffect(() => {
    getProductsByPage(page);
  }, [page]);

  useEffect(() => {
    if (input === "") {
      getProductsByPage(page);
      return;
    }

    getProductById(input);
  }, [input]);

  return (
    <>
      <Navbar />
      <Flex padding={16} h="100vh" w="100vw" justifyContent={"center"}>
        <VStack w={["100%", "100%", "50%"]}>
          <HStack>
            <Flex>
              <Input onChange={handleInput} placeholder="Search by id..." />
            </Flex>
            <Button
              mx={4}
              colorScheme="blue"
              variant="outline"
              onClick={() => {
                getProductById(input);
              }}
            >
              {loading ? <Spinner /> : "check"}
            </Button>
          </HStack>
          {data && (
            <>
              <Products products={data} />
              <Pagination
                totalPages={2}
                onPageChange={setPage}
                currentPage={page}
              />
            </>
          )}
        </VStack>
      </Flex>
    </>
  );
}
