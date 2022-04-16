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
  const images = [
    { url: "https://neilpatel.com/wp-content/uploads/2018/10/blog.jpg", author: "Tannu Rawat" },
    {
      url: "http://cdn2.hubspot.net/hub/53/file-23115630-jpg/blog/images/blogging_image.jpg",
      author: "Anjali P"
    }, {
      url: "https://wbcomdesigns.com/wp-content/uploads/2017/01/blog-post-inspiration-for-WordPress.jpg",
      author: "Anjali P"
    }, {
      url: "https://www.iata.org/contentassets/d7c512eb9a704ba2a8056e3186a31921/cargo_live_animals_parrot.jpg",
      author: "Anjali P"

    }, {
      url: "https://media.wired.com/photos/593261cab8eb31692072f129/master/pass/85120553.jpg",
      author: "Anjali P"

    }, {
      url: "https://thumbs.dreamstime.com/b/animals-harmony-beautiful-sunset-view-peaceful-park-living-collage-59033870.jpg",
      author: "Anjali P"

    },
  ]
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
            <Text>Posted by {item.author}</Text>
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
