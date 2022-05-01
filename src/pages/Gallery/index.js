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
  useToast,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, BellIcon } from "@chakra-ui/icons";
import { FiImage, FiHeart, FiTrash } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { FaHeart } from "react-icons/fa";

export default function Gallery() {
  const toast = useToast();
  const hi = "";
  const [images, setImages] = useState([]);
  useEffect(() => {
    const user = reactLocalStorage.getObject("user");
    axios
      .get(
        process.env.REACT_APP_BACKEND_API_URL +
          "/photos" +
          "?token=" +
          user.token
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          setImages(res.data.data);
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
  }, []);
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
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = reactLocalStorage.getObject("user");
  console.log(item);
  const updateLikeDislike = (id, like) => {
    console.log(like, 'lksjdflksjdlj')
    axios
      .post(
        process.env.REACT_APP_BACKEND_API_URL +
          "/imagesLikeDislike" +
          "?token=" +
          user.token,
        { image_id: id, like: like }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          console.log("hello world");
          window.location.reload()
        } else {
          console.log(res);
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

  const onDeletePhoto = (id) => {
    console.log(id, "ksdjfkhskjh");
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
          "/photo/" +
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
          console.log(res);
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

  const getIfLiked = (item)=>{
    const likes = item.galleryImageLikeDislike
    if (likes.length==0){
      return false
    }else{
      const u_likes = likes.filter((i)=>i.user_id==item.c_user_id)
      console.log(u_likes, 'klsdjflksjlj');
      if (u_likes.length>0){
        return u_likes[0].like
      }
    }
    return false
  }

  return (
    <>
      <Box
        cursor="pointer"
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
          <Box display="flex" alignItems="stretch">
            <Text>Posted by {item.users.name}</Text>
            <Box display="flex" marginLeft="auto">
              <FaHeart
                onClick={() =>
                  updateLikeDislike(
                    item.id,
                    getIfLiked(item)?false:true
                  )
                }
                color={
                  getIfLiked(item)?"red":""
                }
                style={{ marginLeft: "auto" }}
              />
              {item.users[0].email == user.email ||
              user.email == process.env.REACT_APP_ADMIN_USER ? (
                <FiTrash
                  w={10}
                  onClick = {()=>onDeletePhoto(item.id)}
                  h={10}
                  color="red"
                  style={{ marginLeft: "30px" }}
                />
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Box>
      </Box>{" "}
      <Modal isCentered onClose={onClose} isOpen={isOpen} size="4xl">
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
