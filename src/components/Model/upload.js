import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Center,
  useColorModeValue,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Button,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";

import { AiFillFileAdd } from "react-icons/ai";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
export default function Dropzone({ onFileAccepted }) {
  const toast = useToast();
  const [image, setImage] = useState();
  const [isloading, setLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // onFileAccepted(acceptedFiles[0]);
      console.log(acceptedFiles);
      setImage(acceptedFiles[0]);
    },
    // [onFileAccepted]
    []
  );

  const onSubmitForm = () => {
    const user = reactLocalStorage.getObject("user");
    const data = new FormData();
    data.append("myimage", image);
    if (!image) {
      return toast({
        title: "Select image to upload",
        status: "error",
        variant: "left-accent",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    setLoading(true);
    axios
      .post(
        process.env.REACT_APP_BACKEND_API_URL +
          "/uploadPhoto" +
          "?token=" +
          user.token,
        data
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast({
            title: "Image uploaded on cloud",
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        leftIcon={<MdUpload />}
        style={{ marginLeft: "auto" }}
        display={{base: "none", md: "block"}}
        onClick={onOpen}
      >
        Upload Photo
      </Button>
      <Button
        display={{ base: "block", md: "none" }}
        leftIcon={<MdUpload />}
        style={{ marginLeft: "auto" }}
        onClick={onOpen}
      ></Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="6xl"
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody padding="50px">
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
              <p>
                {image
                  ? image?.name +
                    " | " +
                    (image?.size / 1000000).toFixed(3) +
                    " MB"
                  : dropText}
              </p>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={onSubmitForm}
              isLoading={isloading}
              loadingText="Uploading image."
              colorScheme="green"
            >
              Upload Image
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
