import { Box, Flex } from '@hope-ui/solid';
import { App } from '@prisma/client';
import { useRouteData } from 'solid-app-router';
import type { Component } from 'solid-js';

const AppBuilder: Component = () => {
  const routeData = useRouteData<() => App>();
  console.log(routeData());
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

export default AppBuilder;
