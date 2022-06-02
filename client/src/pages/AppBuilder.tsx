import {
  Box,
  Button,
  createDisclosure,
  Flex,
  IconButton,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tooltip,
} from '@hope-ui/solid';
import { App, Page, Prisma, Route } from '@prisma/client';
import { useRouteData } from 'solid-app-router';
import { Component, createSignal, For, Index, Suspense } from 'solid-js';
import ComponentRenderer from '../component-library/ComponentRenderer';
import { AiOutlinePlus } from 'solid-icons/ai';
import axios from 'axios';
import NewRouteModal from '../components/NewRouteModal';
import ContextMenu from '../components/ContextMenu';

type AppState = App & { routes: (Route & { page: Page | null })[] };
type Loader = [() => AppState, { refetch: () => Promise<AppState> }];

const AppBuilder: Component = () => {
  const [routeData] = useRouteData<Loader>();
  const [appState, setAppState] = createSignal(routeData());
  const [tabIndex, setTabIndex] = createSignal(0);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = createDisclosure();

  console.log(appState());

  const handleTabsChange = (index: number) => setTabIndex(index);
  const handleAddRoute = async (data: { title: string; slug: string }) => {
    const res = await axios.post(`http://localhost:8000/api/apps/${appState().id}/routes`, data);
    console.log(res.data);
    setAppState(res.data);
    setTabIndex(appState().routes.length - 1);
  };
  const handleDeleteRoute = async (routeId: string) => {
    const res = await axios.delete(
      `http://localhost:8000/api/apps/${appState().id}/routes/${routeId}`
    );
    setAppState(res.data);
    setTabIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  return (
    <Box p={24} h="100%">
      <Box>Toolbar</Box>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Tabs h="100%" index={tabIndex()} onChange={handleTabsChange}>
          <TabList>
            <Index each={appState().routes}>
              {(route, i) => (
                <ContextMenu>
                  <Tab>{route().slug}</Tab>
                </ContextMenu>
              )}
            </Index>
            <Tooltip label="Add route" placement="bottom-start">
              <IconButton
                aria-label="Add route"
                variant="ghost"
                onClick={onModalOpen}
                icon={<AiOutlinePlus size={18} />}
              />
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
      </Suspense>
      <NewRouteModal isOpen={isModalOpen} onClose={onModalClose} onAddRoute={handleAddRoute} />
    </Box>
  );
};

export default AppBuilder;
