import { Box, Button, Container, Grid, GridItem, Text } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useAtom, useSetAtom } from 'jotai'

import { userAtom, userLocationAtom } from 'atoms/user'

import { ConfirmationDialog } from 'components/ConfirmationDialog'
import { Form, Input } from 'components/Form'

import { API_URL } from 'lib/urls'

type FormValues = {
  name: string
  email: string
  country: string
  state: string
  city: string
  cep: string
  street: string
  number: string
  complement: string
  cpf: string
  pis: string
  password: string
}

const request = (data: FormValues) =>
  fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())

export default function UserForm() {
  const setUserLocation = useSetAtom(userLocationAtom)
  const [user, setUser] = useAtom(userAtom)
  const toast = useToast()

  const defaultValues = user.id
    ? user
    : {
        name: '',
        email: '',
        country: '',
        state: '',
        city: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        cpf: '',
        pis: '',
        password: '',
      }

  async function handleCreateUser(data: FormValues) {
    const response = await request(data)

    if (response.id) {
      setUser(response)
      setUserLocation('2_logged')
    } else {
      toast({
        title: 'Erro ao criar usuário',
        description: 'Verifique se todos os campos estão preenchidos',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  async function handleUpdateUser(data: FormValues) {
    const response = await fetch(`${API_URL}/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())

    if (response.id) {
      setUser(response)
      setUserLocation('2_logged')
    } else {
      toast({
        title: 'Erro ao editar usuário',
        description: 'Verifique se todos os campos estão preenchidos',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  async function handleDelete() {
    setUserLocation('0_visitor')
    const response = await fetch(`${API_URL}/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())

    if (response.id) {
      setUser({})
      setUserLocation('0_visitor')
    } else {
      toast({
        title: 'Erro ao deletar usuário',
        description: 'Tente novamente em alguns minutos',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  function handleReturn() {
    if (user.id) return setUserLocation('2_logged')
    return setUserLocation('0_visitor')
  }

  function onSubmit(data: FormValues) {
    return user.id ? handleUpdateUser(data) : handleCreateUser(data)
  }

  return (
    <Container>
      <Box my={5}>
        <Text mb={5}>Não use dados reais.</Text>
        <Form<FormValues> onSubmit={onSubmit} defaultValues={defaultValues}>
          {({ register }) => (
            <Grid templateColumns="repeat(6, 1fr)" gap={3}>
              <GridItem colSpan={6}>
                <Input {...register('name')} />
              </GridItem>
              <GridItem colSpan={6}>
                <Input {...register('email')} autoComplete="email" />
              </GridItem>
              <GridItem colSpan={3}>
                <Input {...register('country')} />
              </GridItem>
              <GridItem colSpan={3}>
                <Input {...register('state')} />
              </GridItem>
              <GridItem colSpan={4}>
                <Input {...register('city')} />
              </GridItem>
              <GridItem colSpan={2}>
                <Input
                  {...register('cep')}
                  type="number"
                  placeholder="_____-___"
                />
              </GridItem>
              <GridItem colSpan={{ base: 6, lg: 4 }}>
                <Input {...register('street')} />
              </GridItem>
              <GridItem colSpan={{ base: 3, lg: 1 }}>
                <Input {...register('number')} type="number" />
              </GridItem>
              <GridItem colSpan={{ base: 3, lg: 1 }}>
                <Input {...register('complement')} />
              </GridItem>
              <GridItem colSpan={3}>
                <Input
                  {...register('cpf')}
                  type="number"
                  placeholder="___.___.___-__"
                />
              </GridItem>
              <GridItem colSpan={3}>
                <Input
                  {...register('pis')}
                  type="number"
                  placeholder="___._____.__-_"
                />
              </GridItem>
              <GridItem colSpan={{ base: 6, lg: 4 }}>
                <Input
                  {...register('password')}
                  type="password"
                  autoComplete="new-password"
                />
              </GridItem>
              <GridItem colSpan={3} mt={3}>
                <Button colorScheme={'teal'} type="submit">
                  Confirmar
                </Button>
              </GridItem>
              <GridItem colSpan={3} mt={3}>
                <Button onClick={handleReturn}>Voltar</Button>
              </GridItem>
              {user.id ? (
                <GridItem colSpan={6} mt={3}>
                  <ConfirmationDialog onConfirm={handleDelete} />
                </GridItem>
              ) : (
                <></>
              )}
            </Grid>
          )}
        </Form>
      </Box>
    </Container>
  )
}
