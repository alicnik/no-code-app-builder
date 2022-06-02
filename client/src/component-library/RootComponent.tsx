import { Container } from '@hope-ui/solid';
import type { Component, ParentProps } from 'solid-js';

// The root component for any page
// componentLibrartId = 'root'
const RootComponent: Component<ParentProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default RootComponent;
