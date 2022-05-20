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
  Checkbox,
  useToast,
  Center
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import { ColorModeSwitcher } from "../../components/DarkTheme/index";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';

const avatars = [
  {
    name: "Anjali Prajapati",
    url: "https://avatars.githubusercontent.com/u/100531680?v=4",
    githubUrl: "https://github.com/iamanjaliprajapati",
  },
  {
   name: "Geetika Meena",
   url: "https://avatars.githubusercontent.com/u/101466812?v=4",
    githubUrl: "https://github.com/geetikameena21",
  },
  {
    name: "Riya Rathi",
    url: "https://avatars.githubusercontent.com/u/101453687?v=4",
    githubUrl: "https://github.com/iamriyarathi",
  },
  {
    name: "Tannu Rawat",
    url: "https://avatars.githubusercontent.com/u/101473171?v=4",
    githubUrl: "https://github.com/tannurawat",
  },
];

export default function Login() {
  const [redirectUrl, setRedirectUrl] = useState("")
  useEffect(() => {

    const user = reactLocalStorage.getObject("user")
    if (user.token) {
      setRedirectUrl("/")
    }
  })
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isloading, setLoading] = useState(false)
  const toast = useToast()
  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onLogin = (event) => {
    toast.closeAll()
    event.preventDefault();
    if (values.email == "" || values.password == "") {
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
    setLoading(true)
    axios.post(process.env.REACT_APP_BACKEND_API_URL + "/login", { "email": values.email, "password": values.password })
      .then((res) => {
        if (res.data.status == "success") {
          reactLocalStorage.setObject("user", { 'token': res.data.token, 'name': res.data.name, "email": values.email})
          toast({
            title: "Login Successfully!",
            description: `Welcome back ${res.data.name}`,
            status: 'success',
            variant: "left-accent",
            duration: 9000,
            isClosable: true,
            position: 'bottom-right'
          })
          setRedirectUrl('/')
        } else if (res.data.status == 'error') {
          setLoading(false)
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
  const onGoogleLogin = (event)=>{
    const name = event.profileObj.givenName+" " +event.profileObj.familyName
    toast({
      title: "Login Successfully",
      description: `Welcome back ${name}`,
      status: 'success',
      variant: "left-accent",
      duration: 9000,
      isClosable: true,
      position: 'bottom-right'
    })
    reactLocalStorage.setObject("user", { 'token': event.tokenId, 'name': name })
    setRedirectUrl('/')
  }
  return (
    <Box position={"relative"}>
      {redirectUrl !== "" ? (<Redirect to={redirectUrl} />) : ""}
      <ColorModeSwitcher />
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            color={useColorModeValue("gray.700", "gray.200")}
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
              {avatars.map((avatar) => (
                <Link to={{ pathname: avatar.githubUrl }} target="_blank">
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
              Sign in to your account
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
          <Box onSubmit={onLogin} as={"form"} mt={10}>
            {/* <form > */}
            <Stack spacing={4}>
              <Input
                placeholder="Email address"
                bg={useColorModeValue("gray.200", "gray.700")}
                border={0}
                name="email"
                value={values.email}
                onChange={changeHandler}
                color={useColorModeValue("gray.700", "gray.200")}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <InputGroup>
                <Input
                  bg={useColorModeValue("gray.200", "gray.700")}
                  value={values.password}
                  onChange={changeHandler}
                  name="password"
                  placeholder="Password"
                  color={useColorModeValue("gray.700", "gray.200")}
                  type={showPassword ? "text" : "password"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {/* adding forgot password */}
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link to={"/forgot_password"} color={"blue.400"}>
                    {" "}
                    <span style={{ color: "#4299E1" }}>Forgot password?</span>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
            <Button
              fontFamily={"heading"}
              mt={8}
              isLoading={isloading}
              loadingText="Loging In..."
              type="submit"
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
            >
              Sign in
            </Button>
            {/* <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={renderProps => (
                <Button
                  onClick={renderProps.onClick}
                  isLoading={renderProps.disabled}
                  loadingText="Loading..."
                  w={'full'}
                  maxW={'md'}
                  mt={3}
                  variant={'outline'}
                  leftIcon={<FcGoogle />}>
                  <Center>
                    <Text>Sign in with Google</Text>
                  </Center>
                </Button>)}
              buttonText="Login"
              onSuccess={onGoogleLogin}
              onFailure={(e) => {
                toast({
                  title: "Google Login Error",
                  description: e.error,
                  status: 'error',
                  variant: "left-accent",
                  duration: 9000,
                  isClosable: true,
                  position: 'bottom-right'
                })
              }}
              cookiePolicy={'single_host_origin'}
            />
             */}
          </Box>
          <Stack pt={1}>
            <Text
              color={useColorModeValue("gray.700", "gray.200")}
              align={"center"}
            >
              Create an account{" "}
              <Link to="/signup">
                <span style={{ color: "#4299E1" }}>Sign up</span>
              </Link>
            </Text>
          </Stack>
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
