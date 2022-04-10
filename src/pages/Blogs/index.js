import React, { useEffect } from "react";
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
import { useState } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { FiDelete, FiTrash } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  const toast = useToast();
  const onDeleteBlog = (e) => {
    console.log(e);
    const user = reactLocalStorage.getObject("user")
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
          "/deleteBlog/"+id+"?token=" +
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
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Avatar size="sm" name={props.name} />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
      {props.user_id == props.user_id_real ? (
        <Button
          id={props.blog_id}
          onClick={onDeleteBlog}
          style={{ marginLeft: "auto" }}
          colorScheme="red"
          variant="ghost"
        >
          <FaTrash />
        </Button>
      ) : (
        ""
      )}
    </HStack>
  );
};

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
        image={"https://miro.medium.com/max/700/1*TbRWKDQzHvDDne_xBa6m5Q.jpeg"}
        author={
          <BlogAuthor
            blog_id={item.id}
            user_id={item.user_id}
            user_id_real={item.c_user_id}
            name={item.author}
            date={new Date(item.created_at)}
          />
        }
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
