import { Box, Button, Container, Grid, GridItem } from "@chakra-ui/react"

import { Form, Input } from "components/Form/index"

type FormValues = {
  name: string
  email: string
  address: {
    country: string
    state: string
    city: string
    cep: string
    street: string
    number: string
    complement: string
  }
  cpf: string
  pis: string
  password: string
}

export default function Page() {
  const onSubmit = (data: FormValues) => console.log(data)

  return (
    <Container>
      <Box my={5}>
        <Form<FormValues> onSubmit={onSubmit}>
          {({ register }) => (
            <Grid templateColumns="repeat(6, 1fr)" gap={3}>
              <GridItem colSpan={6}>
                <Input {...register("name")} />
              </GridItem>
              <GridItem colSpan={6}>
                <Input {...register("email")} autoComplete="email" />
              </GridItem>
              <GridItem colSpan={3}>
                <Input {...register("address.country")} />
              </GridItem>
              <GridItem colSpan={3}>
                <Input {...register("address.state")} />
              </GridItem>
              <GridItem colSpan={4}>
                <Input {...register("address.city")} />
              </GridItem>
              <GridItem colSpan={2}>
                <Input {...register("address.cep")} />
              </GridItem>
              <GridItem colSpan={{ base: 6, lg: 4 }}>
                <Input {...register("address.street")} />
              </GridItem>
              <GridItem colSpan={{ base: 3, lg: 1 }}>
                <Input {...register("address.number")} />
              </GridItem>
              <GridItem colSpan={{ base: 3, lg: 1 }}>
                <Input {...register("address.complement")} />
              </GridItem>
              <GridItem colSpan={3}>
                <Input {...register("cpf")} />
              </GridItem>
              <GridItem colSpan={3}>
                <Input {...register("pis")} />
              </GridItem>
              <GridItem colSpan={{ base: 6, lg: 4 }}>
                <Input
                  {...register("password")}
                  type="password"
                  autoComplete="new-password"
                />
              </GridItem>
              {/* <Select
                {...register("sex")}
                options={[
                  { label: "Female", value: "female" },
                  { label: "Male", value: "male" },
                  { label: "Other", value: "other" },
                ]}
              /> */}
              <GridItem colSpan={6} mt={3}>
                <Button colorScheme={"teal"} type="submit">
                  Submit
                </Button>
              </GridItem>
            </Grid>
          )}
        </Form>
      </Box>
    </Container>
  )
}
