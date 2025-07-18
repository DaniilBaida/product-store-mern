import { Container, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

import { Link as RouterLink } from "react-router";
import { useProductStore } from "../store/product";
import ProductCard from "../components/productCard";
const HomePage = () => {
    const { fetchProducts, products } = useProductStore();
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container maxW={"1140px"} py={12}>
            <VStack gap={8}>
                <Text fontSize={30} fontWeight={"bold"} textAlign={"center"}>
                    Current Products
                </Text>
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3,
                    }}
                    gap={10}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>
                {!products && (
                    <Text
                        fontSize="xl"
                        textAlign={"center"}
                        fontWeight="bold"
                        color="gray.500"
                    >
                        No products found
                        <Link as={RouterLink} to={"/create"}>
                            <Text
                                as="span"
                                color="blue.500"
                                _hover={{ textDecoration: "underline" }}
                            >
                                Create a product
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;
