import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";

axios.defaults.baseURL = "https://reqres.in";

// https://reqres.in/api/products/?pages=1&id=1

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider
      toastOptions={{
        defaultOptions: { position: "top", isClosable: true, duration: 3000 },
      }}
    >
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
