import {
    Container,
    Flex,
    Text,
    Link,
    HStack,
    Button,
    Icon,
} from "@chakra-ui/react";

import { FaPlusSquare } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useColorMode } from "./ui/color-mode";
import { Link as RouterLink } from "react-router";

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={{ base: "column", sm: "row" }}
            >
                <Text
                    fontSize={{ base: "22px", sm: "28px" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgClip={"text"}
                >
                    <Link as={RouterLink} to={"/"}>
                        Product Store{" "}
                    </Link>
                </Text>

                <HStack gap={2} alignItems={"center"}>
                    <Link as={RouterLink} to="/create">
                        <Button>
                            <Icon boxSize={6}>
                                <FaPlusSquare />
                            </Icon>
                        </Button>
                    </Link>

                    <Button onClick={toggleColorMode}>
                        <Icon size="md">
                            {colorMode === "dark" ? (
                                <MdLightMode />
                            ) : (
                                <MdDarkMode />
                            )}
                        </Icon>
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default NavBar;
