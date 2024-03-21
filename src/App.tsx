import axios from "axios";
import { Flex, Input, Button, VStack, HStack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Products from "./components/Products";
import { ColorValueHex, PantoneFormat, Product } from "./models/product";

export function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<Product[]>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const mockedData = [
    {
      id: 1,
      name: "cerulean",
      year: 2000,
      color: "#98B2D1" as ColorValueHex,
      pantone_value: "15-4020" as PantoneFormat,
    },
    {
      id: 2,
      name: "fuchsia rose",
      year: 2001,
      color: "#C74375" as ColorValueHex,
      pantone_value: "17-2031" as PantoneFormat,
    },
    {
      id: 3,
      name: "true red",
      year: 2002,
      color: "#BF1932" as ColorValueHex,
      pantone_value: "19-1664" as PantoneFormat,
    },
    {
      id: 4,
      name: "aqua sky",
      year: 2003,
      color: "#7BC4C4" as ColorValueHex,
      pantone_value: "14-4811" as PantoneFormat,
    },
    {
      id: 5,
      name: "tigerlily",
      year: 2004,
      color: "#E2583E" as ColorValueHex,
      pantone_value: "17-1456" as PantoneFormat,
    },
    {
      id: 6,
      name: "blue turquoise",
      year: 2005,
      color: "#53B0AE" as ColorValueHex,
      pantone_value: "15-5217" as PantoneFormat,
    },
  ];

  async function getProductById(id: string) {
    console.log(input);
    setLoading(true);
    const response = await axios.get(`/api/products/?id=${id}`).catch((e) => {
      toast.closeAll();
      toast({
        title: e.message,
        status: "error",
      });
    });

    setData(response?.data.data);
    setLoading(false);
  }

  async function getProductsByPage(page: string) {
    console.log(input);
    setLoading(true);
    const response = await axios
      .get(`/api/products/?$page=${page}`)
      .catch((e) => {
        toast.closeAll();
        toast({
          title: e.message,
          status: "error",
        });
      });
    let products = response?.data.data;
    console.log(typeof products);

    if (products.length < 2) {
      products = [products];

      setData([products]);
    }
    setData(products);
    console.log(products);
    setLoading(false);
  }

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

  useEffect(() => {}, [data, input]);

  return (
    <Flex padding={16} h="100vh" w="100vw" justifyContent={"center"}>
      <VStack w={["100%", "100%", "50%"]}>
        <HStack>
          <Flex>
            <Input onChange={handleInput} placeholder="search..." />
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
        {data && <Products products={data} />}
      </VStack>
    </Flex>
  );
}
