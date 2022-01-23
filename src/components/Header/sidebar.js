import React, { ReactNode } from "react";
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  FlexProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiStar,
  FiImage,
  FiTruck,
  FiUser,
  FiPieChart,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Blogs", icon: FiTrendingUp, url: "/blogs" },
  { name: "Gallery", icon: FiImage, url: "/gallery" },
  { name: "Zomato", icon: FiTruck, url: "/zomato" },
  { name: "Favourites", icon: FiStar },
  { name: "Profile", icon: FiUser },
  { name: "About us", icon: FiPieChart, url: "/about" },
];
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          BlogoFile
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem url={link.url} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ url, icon, children, ...rest }: NavItemProps) => {
  const ccolr = window.location.pathname == url ? "gray.200" : "";
  const ccolr2 = window.location.pathname == url ? "gray.700" : "";
  return (
    <Link
      to={url}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        bg={useColorModeValue(ccolr, ccolr2)}
        cursor="pointer"
        _hover={{
          bg: "green.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default SidebarContent;
