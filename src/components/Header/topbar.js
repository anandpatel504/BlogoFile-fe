import React, { ReactNode, useState } from "react";
import {
  IconButton,
  Avatar,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiStar,
  FiMenu,
  FiImage,
  FiTruck,
  FiUser,
  FiPieChart,
} from "react-icons/fi";
import { Link, Redirect } from "react-router-dom";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { reactLocalStorage } from "reactjs-localstorage";
import getUserName from "../Common/index"
interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome },
  { name: "Blogs", icon: FiTrendingUp },
  { name: "Gallery", icon: FiImage },
  { name: "About us", icon: FiPieChart },
];

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = (
  { onOpen, ...rest }: MobileProps,
  props: Omit<IconButtonProps, "aria-label">
) => {
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const text = useColorModeValue("dark", "light");
  const { toggleColorMode } = useColorMode();
  const [redirectUrl, setRedirectUrl] = useState("")

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      {redirectUrl !== "" ? (<Redirect to={redirectUrl} />) : ""}

      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        BlogoFile
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          {...props}
          aria-label={`Switch to ${text} mode`}
          variant="ghost"
          color="current"
          onClick={toggleColorMode}
          icon={<SwitchIcon />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{getUserName()}</Text>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={(() => {
                reactLocalStorage.remove("user");
                setRedirectUrl('/login')
              })}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
