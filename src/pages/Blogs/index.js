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
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { FiDelete, FiTrash } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Avatar size="sm" name={props.name} />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}{props.user_id}= {props.c_user_id}</Text>
      {
        (props.user_id == props.c_user_id) ? <Button style={{marginLeft: "auto"}} colorScheme="red" variant="ghost"><FaTrash /></Button>: ""
      }
      
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
  
  const [s_blogs, set_s_blogs] = useState([
    {
      title: "The Five Urban Cycling Senses",
      description:
        "It’s a touchy-feely thing, urban cycling. It’s physical, organic and a feast for the senses. I’m sure the spandexy dudes get all sensory on their fancy bikes as they measure their watts or whatever they do, but this is about the Five Urban Cycling Senses in a bicycle-friendly city where your bike is your fifth limb — and all the inherent poetry involved in that.",
      image: "https://miro.medium.com/max/700/1*TbRWKDQzHvDDne_xBa6m5Q.jpeg",
      name: "Pratik Deshmukh",
    },
    {
      title: "The Power of Defiance in the Age of Trans Bans",
      description:
        "Bans on healthcare for trans youth are passing throughout the country. So are bans on trans participation in youth sports, and the acknowledgement of queer people’s existence in classrooms. Until now, I haven’t had the will to write about any of it. Hell, for weeks I could barely bring myself to read very much about these statutes.",
      image:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80",
      name: "Anand Patel",
    },
    {
      title: "Stop Telling Women to Work Harder        ",
      description:
        "Bans on healthcare for trans youth are passing throughout the country. So are bans on trans participation in youth sports, and the acknowledgement of queer people’s existence in classrooms. Until now, I haven’t had the will to write about any of it. Hell, for weeks I could barely bring myself to read very much about these statutes.",
      image: "https://miro.medium.com/max/1400/1*g-7QYIMdlrSh7IxsRvqBwA.jpeg",
      name: "Prakash Simhandri",
    },
  ]);
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
          <BlogAuthor user_id={item.user_id} user_id_real={item.c_user_id} name={item.author} date={new Date(item.created_at)} />
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
