import { Box as HopeUIBox } from '@hope-ui/solid';
import type { Component, ParentProps } from 'solid-js';

// A simple container component that can be used to wrap any other component
// componentLibrartId = 'root'
const Box: Component<ParentProps> = ({ children }) => {
  return <HopeUIBox>{children}</HopeUIBox>;
};

export default Box;
