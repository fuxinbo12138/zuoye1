import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

import { AiOutlineSearch } from "react-icons/ai";
import { BsMicFill } from "react-icons/bs";


export default function Search() {
  return (
    <Box w="561px" mx="auto" mb="38px">
      <InputGroup >
        <InputLeftElement
          w="52px"
          h="44px"
          pointerEvents="none"
          color="gray.300"
          children={<AiOutlineSearch size="24" />}
        />
        <Input borderRadius="20px" pl="52px" pr="40px" placeholder="在谷歌上搜索，或输入一个网址" h="44px" />
        <InputRightElement w="40px" h="44px" children={<BsMicFill size="22" />} />
      </InputGroup>
    </Box>
  );
}
