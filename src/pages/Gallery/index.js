// Sample card from Airbnb
import {
  Box,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, BellIcon } from "@chakra-ui/icons";
import { FiImage, FiHeart } from "react-icons/fi";

export default function Gallery() {
  const hi = "";
  const images = [];
  return (
    <div>
      <SimpleGrid
        style={{ marginTop: "30px" }}
        minChildWidth="270px"
        spacing="20px"
      >
        {images.map((item) => {
          return <ImageWithModal item={item} />;
        })}
      </SimpleGrid>
    </div>
  );
}

function ImageWithModal({ item }: NavItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        cursor="pointer"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 2s",
        }}
        maxW="lg"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Image
          onClick={onOpen}
          fallbackSrc="https://via.placeholder.com/376x250"
          src={item.url}
          style={{ width: "100%", height: "270px" }}
        />

        <Box p="3">
          <Box display="flex" alignItems="baseline">
            <Text>Posted by NG Lite</Text>
            <FiHeart
              w={10}
              h={10}
              color="red.400"
              style={{ marginLeft: "auto" }}
            />
          </Box>
        </Box>
      </Box>{" "}
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody padding="50px">
            <Image
              boxSize="700px"
              style={{ height: "400px", width: "700px" }}
              objectFit="cover"
              src={item.url}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
