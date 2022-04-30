import React, { useEffect, useCallback } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  useColorModeValue,
  Container,
  Button,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { FiDelete, FiTrash } from "react-icons/fi";
import { FaHeart, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { AiFillFileAdd } from "react-icons/ai";

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  const toast = useToast();
  const user = reactLocalStorage.getObject("user");
  console.log(user);
  const onDeleteBlog = (e) => {
    const id = e.target.id;
    console.log(e.target);
    if (!id) {
      return toast({
        title: "Invalid blog ID.",
        status: "error",
        variant: "left-accent",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    axios
      .delete(
        process.env.REACT_APP_BACKEND_API_URL +
          "/deleteBlog/" +
          id +
          "?token=" +
          user.token
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          toast({
            title: "Blog deleted successfully!",
            status: "success",
            variant: "left-accent",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
          window.location.reload();
        } else {
          toast({
            title: res.data.message,
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
  console.log(props.blog);
  return (
    <HStack marginTop="2" spacing="2" display="flex" flexDirection={{ base: "column", sm: "row" }} alignItems="center">
      <HStack marginTop="2" spacing="2" alignItems="center">
        <Avatar size="sm" name={props.blog.author} />
        <Text fontWeight="medium">{props.blog.author}</Text>
        <Text>—</Text>
        <Text>{new Date(props.blog.created_at).toLocaleDateString()}</Text>
      </HStack>
      <div style={{ marginLeft: "auto" }} alignItems="center">
        {(props.blog.user_id == props.blog.c_user_id || user.email == "blogofileadmin@gmail.com") ? (
          <>
            <UpdateBlog blog={props.blog} />
            <Button
              id={props.blog.id}
              onClick={onDeleteBlog}
              colorScheme="red"
              variant="ghost"
            >
              <FaTrash />
            </Button>
          </>
        ) : (
          ""
        )}
        <Button
          id={props.blog.id}
          onClick={onDeleteBlog}
          colorScheme="white"
          variant="ghost"
        >
          <FaHeart />
        </Button>
      </div>
    </HStack>
  );
};

const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(3px) hue-rotate(90deg)"
  />
);

const Blog: React.FC<BlogAuthorProps> = (props) => {
  return (
    <>
      <Box display="flex" flexDirection={{ base: "column", sm: "row" }} p={10}>
        <Box
          display="flex"
          flex="1"
          marginRight="10"
          position="relative"
          alignItems="center"
        >
          <Box
            width={{ base: "100%", sm: "100%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
          >
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image
                borderRadius="lg"
                src={props.image}
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
          </Box>
        </Box>
        <Box
          display="flex"
          flex="2"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
          padding={5}
        >
          <Heading>
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              {props.title}
            </Link>
          </Heading>

          <Text
            as="p"
            marginTop="8"
            marginBottom={8}
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            {props.description}
          </Text>
          {props.author}
        </Box>
      </Box>
      <Divider marginTop="5" />
    </>
  );
};

const UpdateBlog: React.FC<BlogAuthorProps> = (props) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const toast = useToast();
  const onDrop = useCallback();
  // (acceptedFiles) => {
  //   onFileAccepted(acceptedFiles[0]);
  // },
  // [onFileAccepted]
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: [".jpeg", ".jpg", ".png"],
    maxFiles: 1,
    multiple: false,
  });

  const dropText = isDragActive
    ? "Drop the files here ..."
    : "Drag 'n' drop Image here, or click to select files";

  const activeBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue(
    isDragActive ? "teal.300" : "gray.300",
    isDragActive ? "teal.500" : "gray.500"
  );
  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const initialRef = React.useRef();
  useEffect(() => {
    setValues({ title: props.blog.title, description: props.blog.description });
  }, []);
  const onBlogUpdate = () => {
    console.log(values);
    const user = reactLocalStorage.getObject("user");
    axios
      .put(
        process.env.REACT_APP_BACKEND_API_URL +
          "/updateBlog/" +
          props.blog.id +
          "?token=" +
          user.token,
        {
          title: values.title,
          description: values.description,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          toast({
            title: "Blog updated successfully!",
            status: "success",
            variant: "left-accent",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
          window.location.reload();
        } else {
          toast({
            title: res.data.message,
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
    <>
      <Button
        variant={"ghost"}
        style={{ marginLeft: "auto" }}
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        <FaPencilAlt />
      </Button>
      <Modal isCentered isOpen={isOpen} size="4xl" onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Update Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                autoFocus
                onChange={changeHandler}
                value={values.title}
                name="title"
                ref={initialRef}
                placeholder="Enter Your Blog Title..."
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <Textarea
                placeholder="Here is a sample placeholder"
                size="sm"
                onChange={changeHandler}
                value={values.description}
                name="description"
                resize="vertical"
              />{" "}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Upload Image</FormLabel>
              <Center
                p={20}
                cursor="pointer"
                bg={isDragActive ? activeBg : "transparent"}
                _hover={{ bg: activeBg }}
                transition="background-color 0.2s ease"
                borderRadius={4}
                border="3px dashed"
                borderColor={borderColor}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon as={AiFillFileAdd} mr={2} />
                <p>{dropText}</p>
              </Center>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={onBlogUpdate}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ArticleList = () => {
  const [s_blogs, set_s_blogs] = useState([]);
  useEffect(() => {
    const user = reactLocalStorage.getObject("user");
    axios
      .get(
        process.env.REACT_APP_BACKEND_API_URL + "/getAll?token=" + user.token
      )
      .then((res) => {
        set_s_blogs(res.data.reverse());
        console.log(res);
      });
  }, []);

  const bloglist = s_blogs?.map((item) => {
    return (
      <Blog
        title={item.title}
        description={item.description}
        image={"https://neilpatel.com/wp-content/uploads/2018/10/blog.jpg"}
        author={<BlogAuthor blog={item} />}
      />
    );
  });
  return (
    <Container maxW={"100%"} p={1}>
      {bloglist}
    </Container>
  );
};

export default ArticleList;
