import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
export default function Forgot(): JSX.Element {
  const [redirectUrl, setRedirectUrl] = useState("");
  const toast = useToast();
  const [isloading, setLoading] = useState(false);
  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [values, setValues] = useState({
    email: "",
  });
  const onForgot = (e) => {
    toast.closeAll();
    e.preventDefault();
    if (values.email == "") {
      toast({
        title: "Invalid Details.",
        description: "Input fields can't be empty.",
        status: "error",
        variant: "left-accent",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    setLoading(true);
    axios
      .post(process.env.REACT_APP_BACKEND_API_URL + "/forgot-password", {
        email: values.email
      })
      .then((res) => {
          console.log(res);
        if (res.data.status == "success") {
          toast({
            title: `Hey ${res.data.user.name}`,
            description: `Reset link sent to your email ${res.data.user.email}`,
            status: "success",
            variant: "left-accent",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
          setRedirectUrl("/login");
        } else if (res.data.status == "error") {
          setLoading(false);
          toast({
            title: res.data.message,
            status: "error",
            variant: "left-accent",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
        }else{
            setLoading(false);
          toast({
            title: "Server error..",
            status: "error",
            variant: "left-accent",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {redirectUrl !== "" ? <Redirect to={redirectUrl} /> : ""}

      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a reset link
        </Text>
        <Box onSubmit={onForgot} as={"form"}>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              name="email"
              value={values.email}
              onChange={changeHandler}
            />
          </FormControl>
          <Stack spacing={6} pt={5}>
            <Button
              isLoading={isloading}
              loadingText="Sending Email..."
              type="submit"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Request Reset
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
