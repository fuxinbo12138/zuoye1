import { Box } from '@chakra-ui/react'

import { css } from '@emotion/react'

const logo = css`
    background-image: url('/images/google_logo.svg')
`

export default function Header() {
    return <Box css={logo} mt="200px" mb="38px" w="272px" h="92px" mx="auto">    
    </Box>
}