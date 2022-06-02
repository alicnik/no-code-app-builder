import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@hope-ui/solid';
import { Component, createSignal, For } from 'solid-js';
import { App, Prisma } from '@prisma/client';
import { Link, useNavigate, useRouteData } from 'solid-app-router';
import axios from 'axios';

type Loader = [() => App[], { refetch: () => Promise<App[]> }];

const Dashboard: Component = () => {
  const [routeData, { refetch }] = useRouteData<Loader>();

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:8000/api/apps/${id}`);
    refetch();
  };

  return (
    <Box p={24}>
      <Heading as="h1" mb={24}>
        My Apps
      </Heading>
      <Flex gap={16} mb={24}>
        <For each={routeData()}>
          {(app) => (
            <Box border="1px solid black" borderRadius={3} padding={4}>
              <Link href={`/builder/${app.id}`}>
                <Heading as="h3">{app.name}</Heading>
              </Link>
              <Text color="red" size="sm" cursor="pointer" onClick={() => handleDelete(app.id)}>
                Delete
              </Text>
            </Box>
          )}
        </For>
      </Flex>
      <Heading as="h2">New App</Heading>
      <NewAppForm refetch={refetch} />
    </Box>
  );
};

const NewAppForm: Component<{ refetch: () => Promise<App[]> }> = ({ refetch }) => {
  const navigate = useNavigate();
  const [name, setName] = createSignal<Prisma.AppCreateInput['name']>('');
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8000/api/apps/new', {
      name: name(),
      email: 'admin@email.com',
    });
    refetch();
    // const app = res.data;
    // navigate(`/builder/${app.id}`);
  };

  return (
    <VStack as="form" onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel for="name">App name</FormLabel>
        <Input
          id="name"
          type="text"
          value={name()}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </FormControl>
      <Button type="submit">Create new app</Button>
    </VStack>
  );
};

export default Dashboard;
