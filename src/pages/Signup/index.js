import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Link, Redirect } from "react-router-dom";
import { ColorModeSwitcher } from "../../components/DarkTheme/index";
import {reactLocalStorage} from 'reactjs-localstorage';

const avatars = [
  {
    name: "Anand Patel",
    url: "https://avatars.githubusercontent.com/u/44016225?v=4",
    githubUrl: "https://github.com/anandpatel504",
  },
  {
   name: "Pratik Deshmukh",
   url: "https://avatars.githubusercontent.com/u/44018192?v=4",
    githubUrl: "https://github.com/pratikdeshmukh2004",
  },
  {
    name: "Anmol Mehra",
    url: "https://avatars.githubusercontent.com/u/70458652?v=4",
    githubUrl: "https://github.com/iamanmolmehra",
  },
//   {
//     name: "Tannu Rawat",
//     url: "https://avatars.githubusercontent.com/u/101473171?v=4",
//     githubUrl: "https://github.com/tannurawat",
//   },
];

export default function Signup() {
  const [redirectUrl, setRedirectUrl] = useState("/signup")
  useEffect(() => {
    const user = reactLocalStorage.getObject("user")
    if (user.token) {
      setRedirectUrl("/")
    }
  })
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const toast = useToast()
  const onSignup = (e) => {
    toast.closeAll()
    e.preventDefault();
    if (values.fname == "" || values.lname == "" || values.email == "" || values.password == "") {
      toast({
        title: "Invalid Details.",
        description: "Input fields can't be empty.",
        status: 'error',
        variant: "left-accent",
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      })
      return;
    }
    setisloading(true)
    axios.post(process.env.REACT_APP_BACKEND_API_URL + "/signup", { "name": values.fname + " " + values.lname, "email": values.email, "password": values.password })
      .then((res) => {
        if (res.data.status == "success") {
          setValues({ fname: "", lname: "", email: "", password: "" })
          toast({
            title: "Signup Successfully!",
            description: "Your account has been created.",
            status: 'success',
            variant: "left-accent",
            duration: 9000,
            isClosable: true,
            position: 'bottom-right'
          })
          setRedirectUrl('/')
        } else if (res.data.status == 'error') {
          setisloading(false)
          toast({
            title: res.data.message,
            status: 'error',
            variant: "left-accent",
            duration: 9000,
            isClosable: true,
            position: 'bottom-right'
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <Box position={"relative"}>
      <ColorModeSwitcher />
      <Redirect to={redirectUrl} />
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            BLOGOFILE{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              Discover Stories
            </Text>{" "}
            .
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar, index) => (
                <Link key={index} to={{ pathname: avatar.githubUrl }} target="_blank">
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    // size={useBreakpointValue({ base: "md", md: "lg" })}
                    position={"relative"}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: "full",
                      height: "full",
                      rounded: "full",
                      transform: "scale(1.125)",
                      bgGradient: "linear(to-bl, red.400,pink.400)",
                      position: "absolute",
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                </Link>
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              width={useBreakpointValue({ base: "44px", md: "60px" })}
              height={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={useColorModeValue("gray.50", "gray.900")}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={useColorModeValue("gray.700", "gray.200")}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Sign up
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              to enjoy all of our cool features ✌️!
            </Text>
          </Stack>
          <Box onSubmit={onSignup} as={"form"} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Firstname"
                onChange={changeHandler}
                name="fname"
                value={values.fname}
                bg={useColorModeValue("gray.200", "gray.700")}
                border={0}
                color={useColorModeValue("gray.700", "gray.200")}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                placeholder="Lastname"
                onChange={changeHandler}
                name="lname"
                value={values.lname}
                bg={useColorModeValue("gray.200", "gray.700")}
                border={0}
                color={useColorModeValue("gray.700", "gray.200")}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                placeholder="Email@gmail.com"
                value={values.email}
                onChange={changeHandler}
                name="email"
                bg={useColorModeValue("gray.200", "gray.700")}
                border={0}
                color={useColorModeValue("gray.700", "gray.200")}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <InputGroup>
                <Input
                  value={values.password}
                  bg={useColorModeValue("gray.200", "gray.700")}
                  placeholder="Password"
                  onChange={changeHandler}
                  name="password"
                  color={useColorModeValue("gray.700", "gray.200")}
                  type={showPassword ? "text" : "password"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
            <Button
              isLoading={isloading}
              loadingText="Loging In..."
              fontFamily={"heading"}
              align={"center"}
              type="submit"
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
            >
              Sign up
            </Button>

          </Box>
          {/* </Stack> */}
          <Stack pt={1}>
            <Text
              color={useColorModeValue("gray.700", "gray.200")}
              align={"center"}
            >
              Already a user?{" "}
              <Link color={"blue.400"} to="/login">
                <span style={{ color: "#4299E1" }}>Login</span>
              </Link>
            </Text>
          </Stack>
          {/* </Stack> */}
          form
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
