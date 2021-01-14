import React, { useState } from "react";

import Login from "./components/login";

import Register from "./components/register";

import { Box } from "@chakra-ui/react";

import { css } from "@emotion/react";

import styled from "@emotion/styled";

const Span = styled.span`
  font-size: 20px;
  color: #969696;
  padding: 10px;
  cursor: pointer;
  &:hover {
    border-bottom: 3px solid #ea6f5a;
  }
  &.active {
    color: #ea6f5a;
    border-bottom: 3px solid #ea6f5a;
  }
`;
const bStyle = css`
  font-size: 20px;
  color: #969696;
  padding: 10px;
`;

function App() {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Box
        w="400px"
        mx="auto"
        mt="200px"
        p="50px"
        pb="30px"
        bgColor="#fff"
        borderRadius="md"
        boxShadow="xl"
      >
        <Box mb="50px" textAlign="center">
          <Span
            className={active === 1 ? "active" : null}
            onClick={() => {
              setActive(1);
            }}
          >
            登录
          </Span>
          <b css={bStyle}>·</b>
          <Span
            className={active === 2 ? "active" : null}
            onClick={() => {
              setActive(2);
            }}
          >
            注册
          </Span>
        </Box>
        {active === 1 ? <Login /> : <Register />}
      </Box>
    </div>
  );
}

export default App;
