import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react'
import { useAtom } from 'jotai'

import { userAtom, userLocationAtom } from 'atoms/user'

import UserForm from './User'
import VisitorForm from './Visitor'

export default function Page() {
  const [userLocation, setUserLocation] = useAtom(userLocationAtom)
  const [user, setUser] = useAtom(userAtom)

  function handleEdit() {
    setUserLocation('1_registering')
  }

  function handleLogOut() {
    setUserLocation('0_visitor')
    setUser({})
  }

  switch (userLocation) {
    case '0_visitor':
      return <VisitorForm />
    case '1_registering':
      return <UserForm />
    case '2_logged':
      return (
        <Container>
          <Box my={5}>
            <Heading mb={3}>{`Olá, ${user.name}`}</Heading>
            <Flex gap={2}>
              <Button colorScheme="teal" onClick={handleEdit}>
                Editar cadastro
              </Button>
              <Button onClick={handleLogOut}>Sair</Button>
            </Flex>
          </Box>
        </Container>
      )
    default:
      return null
  }
}
