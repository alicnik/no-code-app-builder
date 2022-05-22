import { Box, Button, FormControl, FormLabel, Heading, Input, VStack } from '@hope-ui/solid';
import { Component, createSignal } from 'solid-js';
import { Prisma } from '@prisma/client';
import { useNavigate } from 'solid-app-router';
import axios from 'axios';

const Dashboard: Component = () => {
  return (
    <Box p={24}>
      <Heading as="h1">Dashboard</Heading>
      <NewAppForm />
    </Box>
  );
};

const NewAppForm: Component = () => {
  const navigate = useNavigate();
  const [name, setName] = createSignal<Prisma.AppCreateInput['name']>('');
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8000/api/apps/new', {
      name: name(),
      email: 'admin@email.com',
    });
    console.log(res);
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
