import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tooltip,
} from '@hope-ui/solid';
import { App, Page, Prisma, Route } from '@prisma/client';
import { useRouteData } from 'solid-app-router';
import { Component, createSignal, For, Index } from 'solid-js';
import ComponentRenderer from '../component-library/ComponentRenderer';
import { AiOutlinePlus } from 'solid-icons/ai';
import axios from 'axios';

type AppState = App & { routes: (Route & { page: Page | null })[] };
type Loader = [() => AppState, { refetch: () => Promise<AppState> }];

const AppBuilder: Component = () => {
  const [routeData] = useRouteData<Loader>();
  const [appState, setAppState] = createSignal(routeData());
  const [tabIndex, setTabIndex] = createSignal(0);

  console.log(appState());

  const handleTabsChange = (index: number) => setTabIndex(index);
  const handleAddRoute = async () => {
    const res = await axios.post(`http://localhost:8000/api/apps/${appState().id}/routes`);
    setAppState(res.data);
    setTabIndex(appState().routes.length - 1);
  };

  return (
    <Box p={24} h="100%">
      <Box>Toolbar</Box>
      <Tabs h="100%" index={tabIndex()} onChange={handleTabsChange}>
        <TabList>
          <Index each={appState().routes}>{(route) => <Tab>{route().slug}</Tab>}</Index>
          <Tooltip label="Add route" placement="bottom-start">
            <IconButton aria-label="Add route" variant="ghost" icon={<AiOutlinePlus size={18} />} />
          </Tooltip>
        </TabList>
        <Flex h="100%">
          <For each={appState().routes}>
            {(route) => (
              <TabPanel flex={1} bgColor="darkgrey">
                <Box position="relative">{route.slug}</Box>
              </TabPanel>
            )}
          </For>
          <Box w={250}>Tools</Box>
        </Flex>
      </Tabs>
    </Box>
  );
};

export default AppBuilder;
