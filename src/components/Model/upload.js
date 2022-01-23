import { useCallback } from "react";
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
} from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";

import { AiFillFileAdd } from "react-icons/ai";
export default function Dropzone({ onFileAccepted }) {
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
        rightIcon={<MdUpload />}
        colorScheme="green"
        variant="outline"
        style={{ marginLeft: "auto" }}
        onClick={onOpen}
      >
        Upload Photo
      </Button>
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
              <p>{dropText}</p>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green">Upload Image</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
