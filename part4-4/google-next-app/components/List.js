import React from "react";
import {
  Box,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from "@chakra-ui/react";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

const colorList = [
  "#3366FF",
  "#6633FF",
  "#CC33FF",
  "#FF33CC",
  "#33CCFF",
  "#003DF5",
  "#B88A00",
  "#33FFCC",
  "#CCFF33",
];

const ListIcons = styled.div`
  font-size: 30px;
  color: #fff;
  text-align: center;
  height: 48px;
  line-height: 48px;
  width: 48px;
  border-radius: 50%;
  margin: 0 auto;
  cursor: pointer;
`;

const addCss = css`
  background-color: #f1f3f4;
  color: #000000;
  line-height: 44px;
`;

export default function List({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast()

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [list, setList] = React.useState([
    {
      name: "百度一下，你就知道",
      href: "http://www.baidu.com",
    },
  ]);

  function add() {
    if(initialRef.current.value && finalRef.current.value) {
      setList([
        {
          name: initialRef.current.value,
          href: finalRef.current.value,
        },
        ...list
      ])
      onClose()
    }else {
      toast({
        position: "top",
        title: "错误",
        description: "请输入名称和网址",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} size="xl" onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>添加快捷方式</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>名称</FormLabel>
              <Input ref={initialRef} />
            </FormControl>

            <FormControl>
              <FormLabel>地址</FormLabel>
              <Input ref={finalRef} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              取消
            </Button>
            <Button variant="ghost" onClick={add}>添加</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box maxW="585px" mx="auto" mt="20px">
        <HStack mt="20px" wrap="wrap">
          {list.slice(0,9).map((item, index) => {
            return (
              <Box w="112px" h="96px" pt="16px" mt="3px" mb="13px" key={index}>
                <a>
                  <ListIcons
                    style={{
                      backgroundColor: colorList[index],
                    }}
                  >
                    {item.name.split('')[0]}
                  </ListIcons>
                  <Text px="8px" mt="10px" fontSize="lg" isTruncated>
                    {item.name}
                  </Text>
                </a>
              </Box>
            );
          })}
          <Box w="112px" h="96px" pt="16px" mt="3px" mb="13px">
            <a onClick={onOpen}>
              <ListIcons css={addCss}>+</ListIcons>
              <Text px="8px" mt="10px" fontSize="lg" isTruncated>
                添加快捷方式
              </Text>
            </a>
          </Box>
        </HStack>
      </Box>
    </div>
  );
}
