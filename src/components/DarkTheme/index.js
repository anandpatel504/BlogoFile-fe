import React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export const ColorModeSwitcher = (
  props: Omit<IconButtonProps, "aria-label">
) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      {...props}
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      style={{
        float: "right",
        marginTop: "20px",
        marginRight: "10px",
      }}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      size="md"
      fontSize="lg"
    />
  );
};
