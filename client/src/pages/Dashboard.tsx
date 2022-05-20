import { Box, Flex, Heading } from '@hope-ui/solid';
import type { Component } from 'solid-js';

const Dashboard: Component = () => {
  return (
    <Box p={24}>
      <Box>Toolbar</Box>
      <Flex>
        <Box flex={1}>Page</Box>
        <Box w={250}>Tools</Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
