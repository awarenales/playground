import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useAtom, useSetAtom } from 'jotai'

import { userAtom, userLocationAtom } from 'atoms/user'

import { Form, Input } from 'components/Form'

import { API_URL } from 'lib/urls'

type FormValues = {
  username: string
  password: string
}

const request = (data: FormValues) =>
  fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())

export default function VisitorForm() {
  const setUserLocation = useSetAtom(userLocationAtom)
  const [, setUser] = useAtom(userAtom)
  const toast = useToast()

  async function handleGetUser(data: FormValues) {
    const response = await request(data)

    if (response.id) {
      setUser(response)
      setUserLocation('2_logged')
    } else {
      toast({
        title: 'Erro no login',
        description: 'Verifique o usuário e senha',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const onSubmit = (data: FormValues) => handleGetUser(data)

  return (
    <Container>
      <Heading my={5}>Olá, visitante</Heading>
      <Box my={5}>
        <Form<FormValues>
          onSubmit={onSubmit}
          defaultValues={{ username: '', password: '' }}
        >
          {({ register }) => (
            <Flex direction="column" gap={5}>
              <Flex>
                <Input
                  {...register('username')}
                  autoComplete="username"
                  helper="E-mail, CPF ou PIS"
                />
              </Flex>
              <Flex>
                <Input
                  {...register('password')}
                  type="password"
                  autoComplete="current-password"
                />
              </Flex>
              <Flex mt={3}>
                <Box mr="auto" flex="1">
                  <Button colorScheme="teal" type="submit">
                    Entrar
                  </Button>
                </Box>
                <Box>
                  <Button
                    colorScheme="teal"
                    variant="link"
                    my={3}
                    onClick={() => setUserLocation('1_registering')}
                  >
                    Cadastrar
                  </Button>
                </Box>
              </Flex>
            </Flex>
          )}
        </Form>
      </Box>
    </Container>
  )
}
