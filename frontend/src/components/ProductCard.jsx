import {
    Box,
    Heading,
    HStack,
    IconButton,
    Image,
    Dialog,
    Button,
    Text,
    Portal,
    CloseButton,
    VStack,
    Input,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useProductStore } from "../store/product";

import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

const ProductCard = ({ product }) => {
    const { deleteProduct, updateProduct } = useProductStore();
    const [open, setOpen] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleUpdateProduct = async (productId, updatedProduct) => {
        const { success, message } = await updateProduct(
            productId,
            updatedProduct
        );

        toaster.create({
            title: success === true ? "Success" : "Error",
            description: message,
            type: success === true ? "success" : "error",
            closable: true,
        });
    };

    const handleDeleteProduct = async (productId) => {
        const { success, message } = await deleteProduct(productId);

        toaster.create({
            title: success === true ? "Success" : "Error",
            description: message,
            type: success === true ? "success" : "error",
            closable: true,
        });
    };
    return (
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        >
            <Image
                src={product.image}
                alt={product.name}
                h={48}
                w="full"
                minWidth={"200px"}
                objectFit={"cover"}
            />
            <Box p={4}>
                <Heading size="md" mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>
                    ${product.price}
                </Text>

                <HStack gap={2}>
                    <IconButton onClick={() => setOpen(!open)}>
                        <FaEdit />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteProduct(product._id)}
                    >
                        <MdDelete />
                    </IconButton>
                </HStack>
            </Box>
            <Dialog.Root
                lazyMount
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
                placement={"center"}
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner p={8}>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Update Product</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <VStack gap={4}>
                                    <Input
                                        placeholder="Product Name"
                                        name="name"
                                        value={updatedProduct.name}
                                        onChange={(e) =>
                                            setUpdatedProduct({
                                                ...updatedProduct,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        placeholder="Price"
                                        name="price"
                                        value={updatedProduct.price}
                                        onChange={(e) =>
                                            setUpdatedProduct({
                                                ...updatedProduct,
                                                price: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        placeholder="Image URL"
                                        name="image"
                                        value={updatedProduct.image}
                                        onChange={(e) =>
                                            setUpdatedProduct({
                                                ...updatedProduct,
                                                image: e.target.value,
                                            })
                                        }
                                    />
                                </VStack>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Dialog.ActionTrigger asChild>
                                    <Button
                                        onClick={() =>
                                            handleUpdateProduct(
                                                product._id,
                                                updatedProduct
                                            )
                                        }
                                    >
                                        Update
                                    </Button>
                                </Dialog.ActionTrigger>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Box>
    );
};

export default ProductCard;
