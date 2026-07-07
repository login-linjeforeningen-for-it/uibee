import { ReactNode } from "react";

//#region src/components/container/tabs.d.ts
type Tab = {
  id: string;
  label: ReactNode;
};
type TabsProps = {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (id: string) => void;
  children: ReactNode;
  className?: string;
};
type TabPanelProps = {
  id: string;
  activeTab: string;
  children: ReactNode;
};
declare function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledTab,
  onTabChange,
  children,
  className
}: TabsProps): import("react").JSX.Element;
declare function TabPanel({
  id,
  activeTab,
  children
}: TabPanelProps): import("react").JSX.Element | null;
//#endregion
export { TabPanel, Tabs };