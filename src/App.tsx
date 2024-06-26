import axios from "axios";
import { Flex, Input, VStack, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Products from "./components/Products";
import { Product } from "./models/product";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";
import { ProductByIdResponse } from "./models/ProductByIdResponse";
import { ProductsByPageResponse } from "./models/ProductsByPageResponse";
import { useSearchParams } from "react-router-dom";

export function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const [input, setInput] = useState(searchParams.get("id") || "");
  const [data, setData] = useState<Product[] | null>();
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const [totalPages, setTotalPages] = useState<number | null>();

  const toast = useToast();
  async function getProductById(id: string) {
    setSearchParams(`?${new URLSearchParams({ id: input })}`);

    const response = (await axios.get(`/api/products?id=${id}`).catch((e) => {
      toast.closeAll();
      toast({
        title: e.message,
        status: "error",
      });
    })) as ProductByIdResponse;

    if (!response?.data.data) {
      setData(null);
      return;
    }
    setData([response.data.data]);
  }

  async function getProductsByPage(page: number) {
    setSearchParams(`?${new URLSearchParams({ page: page.toString() })}`);

    const response = (await axios
      .get(`/api/products?page=${page}`)
      .catch((e) => {
        toast.closeAll();
        toast({
          title: e.message,
          status: "error",
        });
      })) as ProductsByPageResponse;

    if (!response?.data.data) {
      setData(null);
      return;
    }
    setData(response.data.data);
    setTotalPages(response.data.total_pages);
  }

  function handleInput(event: any) {
    const phrase: string = event.target.value;
    const onlyIntegers = event.target.value.replace(/[^0-9\-]/g, "");

    if (phrase.length > 0 && !phrase.match(/^\d+$/)) {
      toast.closeAll();

      toast({
        title: "only id (integers) are allowed ",
        status: "error",
      });

      return;
    }
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
          </HStack>
          {data && totalPages && (
            <>
              <Products products={data} />
              {totalPages && (
                <Pagination
                  totalPages={totalPages}
                  onPageChange={setPage}
                  currentPage={page}
                />
              )}
            </>
          )}
        </VStack>
      </Flex>
    </>
  );
}
