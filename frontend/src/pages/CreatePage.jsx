import {
    Container,
    Heading,
    VStack,
    Box,
    Input,
    Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from "../components/ui/color-mode";

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });
    const handleAddProduct = () => {
        console.log(newProduct);
    };
    return (
        <Container maxW={"xl"}>
            <VStack gap={8}>
                <Heading mt={24} size={"3xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>
                <Box
                    w={"full"}
                    bg={useColorModeValue("white", "gray.900")}
                    p={6}
                    rounded={"lg"}
                    shadow={"md"}
                >
                    <VStack gap={4}>
                        <Input
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    name: e.target.value,
                                })
                            }
                        ></Input>
                        <Input
                            placeholder="Product Price"
                            name="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    price: e.target.value,
                                })
                            }
                        ></Input>
                        <Input
                            placeholder="Image URL"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    image: e.target.value,
                                })
                            }
                        ></Input>
                        <Button onClick={handleAddProduct} w={"full"}>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;
