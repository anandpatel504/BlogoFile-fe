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
import Dropzone from "../../components/Model/upload";

export default function Gallery() {
  const hi = "";
  const images = [
    { url: "https://bit.ly/2Z4KKcF" },
    {
      url: "https://image.shutterstock.com/image-photo/las-vegas-nv-usa-sep-600w-721215637.jpg",
    },
    {
      url: "https://i.pinimg.com/originals/4c/1d/bd/4c1dbdc7d062dd11cd5b8bf5bbd25d61.jpg",
    },
    {
      url: "https://image.shutterstock.com/image-photo/rio-de-janeiro-brazil-march-600w-1699315558.jpg",
    },
    {
      url: "https://i.pinimg.com/originals/a2/2b/8f/a22b8f0c5cef3f858463a7b627774c91.jpg",
    },
    {
      url: "https://image.shutterstock.com/image-photo/rio-de-janeiro-brazil-march-600w-1699315558.jpg",
    },
    {
      url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
    },
    {
      url: "https://i.pinimg.com/originals/9f/b4/a0/9fb4a0215697afd8dda34ec31612e9fc.png",
    },
    {
      url: "https://c.tenor.com/R7l4ZdOUJPwAAAAC/kya-ho-raha-hai-inspector-chingam.gif",
    },
    {
      url: "https://i.pinimg.com/originals/4c/1d/bd/4c1dbdc7d062dd11cd5b8bf5bbd25d61.jpg",
    },
    {
      url: "https://image.shutterstock.com/image-photo/rio-de-janeiro-brazil-march-600w-1699315558.jpg",
    },
    {
      url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
    },
    {
      url: "https://i.pinimg.com/originals/9f/b4/a0/9fb4a0215697afd8dda34ec31612e9fc.png",
    },
    {
      url: "https://c.tenor.com/R7l4ZdOUJPwAAAAC/kya-ho-raha-hai-inspector-chingam.gif",
    },
    {
      url: "https://i.pinimg.com/originals/4c/1d/bd/4c1dbdc7d062dd11cd5b8bf5bbd25d61.jpg",
    },
  ];
  return (
    <div>
      <Stack direction="row" spacing={4}>
        <Text
          display="flex"
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          <FiImage style={{ marginTop: "5px", marginRight: "5px" }} />
          Gallery
        </Text>
        <Dropzone />
      </Stack>
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
