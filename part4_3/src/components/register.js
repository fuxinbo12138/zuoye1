import React from "react";
import { useFormik } from "formik";
import { Box, Input, InputGroup, InputLeftElement, Button, Flex, Spacer, Checkbox, Link, Divider, useToast } from "@chakra-ui/react";
import { EditIcon, EmailIcon, LockIcon } from '@chakra-ui/icons'
import styled from "@emotion/styled";
import axios from 'axios'

const A = styled.a`
  font-size: 12px;
  color: #3194d0;
`
const P = styled.p`
  font-size: 12px;
  color: #969696;
  text-align: center;
  margin: 10px 0;
`;

function Register() {
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      username: "",
      emial: "",
      password: "",
    },
    onSubmit: (values) => {
      var errorMessage = ""
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      
      if(!reg.test(values.emial)){
        errorMessage = "请输入正确的邮箱"
      }
      if(!values.password) {
        errorMessage = "请输入密码"
      }
      if(!values.emial) {
        errorMessage = "请输入邮箱"
      }
      if(!values.username) {
        errorMessage = "请输入用户名"
      }

      if(errorMessage) {
        toast({
          title: "错误",
          description: errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        })
        return 
      }

      const data = {user:values}
      axios.post(`https://conduit.productionready.io/users`, data)
      .then(res => {
        console.log(res)
      })
      .catch(res => {
        toast({
          title: "错误",
          description: "网络错误",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        })
      })
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children={<EditIcon color="gray.300" />}
          />
          <Input
            type="text"
            name="username"
            {...formik.getFieldProps('username')}
            placeholder="你的昵称"
          />
        </InputGroup>
        <InputGroup my="10px">
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children={<EmailIcon color="gray.300" />}
          />
          <Input
            type="text"
            name="emial"
            {...formik.getFieldProps('emial')}
            placeholder="邮箱"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children={<LockIcon color="gray.300" />}
          />
          <Input
            type="password"
            name="password"
            {...formik.getFieldProps('password')}
            placeholder="密码"
          />
        </InputGroup>
        <Button type="submit" w="100%" mt="10px" bgColor="#3194d0" borderRadius="20px" fontSize="20px" fontWeight="400" colorScheme="teal" variant="solid">
          注册
        </Button>
      </form>
      <P>
        点击 “注册” 即表示您同意并愿意遵守简书
      </P>
      <P>
        <A>用户协议</A>和<A>隐私政策</A>。
      </P>

      <Box mt="50px">
        <Flex color="#969696" my="15px" align="center" px="20px">
          <Divider w="70px" />
          <Spacer />
          <Box flex="8">社交账号注册</Box>
          <Spacer />
          <Divider w="70px" />
        </Flex>
      </Box>
      <Box >
        <Flex color="#969696" my="15px" align="center" justify="center">
          <Link><img width="50" src="b7af5b2dff8d645f643c381038bc0e0f.jpeg" alt="" /></Link>
          <Link><img width="50" src="f83d5bec02fd8d635021070b5f0afb11.jpeg" alt="" /></Link>
          <Link><img width="50" src="f305f75a5f6234c508f283589a1da2eb.jpg" alt="" /></Link>
        </Flex>
      </Box>

    </div>
  );
}

export default Register;
