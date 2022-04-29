import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
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
  Button,
  ModalFooter,
  ModalHeader,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { MdUpload } from "react-icons/md";

import { AiFillFileAdd } from "react-icons/ai";

import { FiPlus } from "react-icons/fi";
import React, { useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
export default function CreateBlog({ onFileAccepted }) {
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const toast = useToast();

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileAccepted(acceptedFiles[0]);
    },
    [onFileAccepted]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: [".jpeg", ".jpg", ".png"],
    maxFiles: 1,
    multiple: false,
  });
  const activeBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue(
    isDragActive ? "teal.300" : "gray.300",
    isDragActive ? "teal.500" : "gray.500"
  );

  const dropText = isDragActive
    ? "Drop the files here ..."
    : "Drag 'n' drop Image here, or click to select files";

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(3px) hue-rotate(90deg)"
    />
  );

  const onBlogCreate = () => {
    if (values.title && values.description) {
    const user = reactLocalStorage.getObject("user")
      axios
        .post(process.env.REACT_APP_BACKEND_API_URL + "/createBlog?token="+user.token, {
          title: values.title,
          description: values.description,
          author: user.name
        })
        .then((res) => {
          console.log(res);
          if (res.data.status == "success") {
            toast({
              title: "Blog created successfully!",
              status: "success",
              variant: "left-accent",
              duration: 9000,
              isClosable: true,
              position: "bottom-right",
            });
            window.location.reload()
          } else{
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
    } else {
      toast({
        title: "Input fields can't be blank.",
        status: "error",
        variant: "left-accent",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const initialRef = React.useRef();

  return (
    <>
      <Button
        leftIcon={<FiPlus />}
        overflow="hidden"
        display={{base: "none", md: "block"}}
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Create Blog
      </Button>
      <Button
        leftIcon={<FiPlus />}
        overflow="hidden"
        display={{base: "block", md: "none"}}
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
      </Button>
      <Modal isCentered isOpen={isOpen} size="4xl" onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Create Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
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
            <Button colorScheme="green" onClick={onBlogCreate}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
