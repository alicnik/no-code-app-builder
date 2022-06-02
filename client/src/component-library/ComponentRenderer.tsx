import type { Component, ParentProps } from 'solid-js';
import { manifest } from './manifest';

interface ComponentRendererProps {
  componentLibraryId: keyof typeof manifest;
}

const ComponentRenderer: Component<ParentProps<ComponentRendererProps>> = ({
  componentLibraryId,
  children,
}) => {
  const Component = manifest[componentLibraryId];
  return <Component>{children}</Component>;
};

export default ComponentRenderer;
