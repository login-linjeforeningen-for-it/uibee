import React$1, { ElementType, JSX, ReactNode } from "react";
import { Components } from "react-markdown";
import { Column, Language, LoginPageProps, ToastType } from "uibee/components";

//#region src/components/inputs/input.d.ts
type InputProps = Omit<React.ComponentProps<'input'>, 'name'> & {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  icon?: JSX.Element;
  info?: string;
  description?: string;
  textSize?: 'sm' | 'md';
};
declare function Input(props: InputProps): JSX.Element;
//#endregion
//#region src/components/inputs/searchInput.d.ts
interface SearchInputProps {
  placeholder?: string;
  variant?: 'default' | 'minimal';
}
declare function SearchInput({
  placeholder,
  variant
}: SearchInputProps): import("react").JSX.Element;
//#endregion
//#region src/components/inputs/textarea.d.ts
type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'name'> & {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  info?: string;
  description?: string;
  type?: 'markdown' | 'json' | 'text';
  textSize?: 'sm' | 'md';
};
declare function Textarea(props: TextareaProps): import("react").JSX.Element;
//#endregion
//#region src/components/inputs/checkbox.d.ts
type CheckboxOption = {
  label: string;
  value: string | number;
};
type CheckboxProps = Omit<React.ComponentProps<'input'>, 'name' | 'onChange' | 'value'> & {
  name: string;
  label?: string;
  error?: string;
  info?: string;
  description?: string;
  className?: string;
  options: CheckboxOption[];
  value?: (string | number)[];
  onChange?: (value: (string | number)[]) => void;
  textSize?: 'sm' | 'md';
};
declare function Checkbox(props: CheckboxProps): import("react").JSX.Element;
//#endregion
//#region src/components/inputs/select.d.ts
type Option$1 = {
  value: string | number;
  label: string;
  image?: string;
};
type SelectProps = {
  label?: string;
  name: string;
  value?: string | number | null;
  onChange?: (value: string | number | null) => void;
  options: Option$1[];
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  info?: string;
  description?: string;
  clearable?: boolean;
  searchable?: boolean;
  textSize?: 'sm' | 'md';
};
declare function Select({
  label,
  name,
  value,
  onChange,
  options,
  error,
  className,
  disabled,
  required,
  placeholder,
  info,
  description,
  clearable,
  searchable,
  textSize
}: SelectProps): import("react").JSX.Element;
//#endregion
//#region src/components/inputs/tagInput.d.ts
type TagInputProps = {
  label?: string;
  name: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  info?: string;
  description?: string;
  textSize?: 'sm' | 'md';
};
declare function TagInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  className,
  disabled,
  required,
  info,
  description,
  textSize
}: TagInputProps): import("react").JSX.Element;
//#endregion
//#region src/components/inputs/multiSelect.d.ts
type Option = {
  label: string;
  value: string;
};
type MultiSelectProps = {
  label?: string;
  name: string;
  options: Option[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  info?: string;
  description?: string;
  textSize?: 'sm' | 'md';
};
declare function MultiSelect({
  label,
  name,
  options,
  value,
  onChange,
  placeholder,
  error,
  className,
  disabled,
  required,
  info,
  description,
  textSize
}: MultiSelectProps): import("react").JSX.Element;
//#endregion
//#region src/components/inputs/switch.d.ts
type SwitchProps = Omit<React.ComponentProps<'input'>, 'name'> & {
  name: string;
  label?: string;
  error?: string;
  info?: string;
  description?: string;
  className?: string;
  switchOnly?: boolean;
  textSize?: 'sm' | 'md';
};
declare function Switch(props: SwitchProps): import("react").JSX.Element;
//#endregion
//#region src/components/inputs/radio.d.ts
type RadioOption = {
  label: string;
  value: string | number;
};
type RadioProps = Omit<React.ComponentProps<'input'>, 'name' | 'onChange' | 'value'> & {
  name: string;
  label?: string;
  error?: string;
  info?: string;
  description?: string;
  className?: string;
  options: RadioOption[];
  value?: string | number | null;
  onChange?: (value: string | number) => void;
  textSize?: 'sm' | 'md';
};
declare function Radio(props: RadioProps): import("react").JSX.Element;
//#endregion
//#region src/components/inputs/range.d.ts
type RangeProps = Omit<React.ComponentProps<'input'>, 'name'> & {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  info?: string;
  description?: string;
  showValue?: boolean;
  textSize?: 'sm' | 'md';
};
declare function Range(props: RangeProps): import("react").JSX.Element;
//#endregion
//#region src/components/logo/logo.d.ts
interface LogoProps {
  className?: string;
}
declare function Logo({
  className
}: LogoProps): import("react").JSX.Element;
//#endregion
//#region src/components/logo/logoSmall.d.ts
declare function LogoSmall(): import("react").JSX.Element;
//#endregion
//#region src/components/toggle/theme.d.ts
declare function ThemeToggle({
  className
}: {
  className?: string;
}): import("react").JSX.Element;
//#endregion
//#region src/components/toggle/language.d.ts
declare function LanguageToggle({
  language
}: {
  language?: Language;
}): import("react").JSX.Element;
//#endregion
//#region src/components/navbar/navbar.d.ts
type NavbarProps = {
  children: React$1.ReactNode;
  bubble?: {
    lang?: BubbleContent;
    theme?: BubbleContent;
    login?: BubbleContent;
  };
  className?: string;
  disableLanguageToggle?: boolean;
  disableThemeToggle?: boolean;
  innerClassName?: string;
  lang?: Language;
  loginPath: string;
  logoutPath: string;
  onlyLogo?: boolean;
  profilePath?: string;
  theme?: string;
  token?: string | null;
};
type BubbleContent = {
  condition: boolean;
  href: string;
  className: string;
  text: string;
  fill: string;
  stroke: string;
  x: string;
  hide: boolean;
  handleHide: (event: React$1.MouseEvent<SVGSVGElement, MouseEvent>) => void;
};
declare function Navbar({
  children,
  bubble,
  className,
  disableLanguageToggle,
  disableThemeToggle,
  innerClassName,
  lang,
  loginPath,
  logoutPath,
  onlyLogo,
  profilePath,
  token
}: NavbarProps): React$1.JSX.Element;
//#endregion
//#region src/components/navbar/navbarItem.d.ts
type NavItemProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  target?: string;
  rel?: string;
  title?: string;
  icon?: ReactNode;
};
declare function NavItem({
  href,
  children,
  external,
  target,
  rel,
  title,
  icon
}: NavItemProps): import("react").JSX.Element;
//#endregion
//#region src/components/navbar/navbarDropdown.d.ts
type NavDropdownProps = {
  children: ReactNode;
  title: string;
  className?: string;
};
declare function NavDropdown({
  children,
  title,
  className
}: NavDropdownProps): React$1.JSX.Element;
//#endregion
//#region src/components/footer/footer.d.ts
type Lang = 'no' | 'en';
type BilingualString = string | {
  no: string;
  en: string;
};
type FooterColumn = {
  heading: BilingualString;
  items: {
    label: BilingualString;
    href?: string;
  }[];
};
type FooterSocialLink = {
  title: string;
  href: string;
  icon: ReactNode;
};
type FooterProps = {
  logo: ReactNode;
  sponsor?: {
    node: ReactNode;
    label?: BilingualString;
  };
  columns?: FooterColumn[];
  socialLinks?: FooterSocialLink[];
  copyright: BilingualString;
  version?: {
    label: string;
    href: string;
  };
  lang?: Lang;
  className?: string;
};
declare function Footer({
  logo,
  sponsor,
  columns,
  socialLinks,
  copyright,
  version,
  lang,
  className
}: FooterProps): import("react").JSX.Element;
//#endregion
//#region src/components/footer/loginContent.d.ts
declare const loginAddress: FooterColumn;
declare const loginEmail: (email: string) => FooterColumn;
declare const loginCopyright: {
  readonly no: "Login - Linjeforeningen for IT, NO 811 940 372";
  readonly en: "Login - Association for IT, NO 811 940 372";
};
declare const loginSponsor: {
  readonly label: {
    readonly no: "Hovedsamarbeidspartner";
    readonly en: "Main partner";
  };
};
type LoginSocialLinkData = {
  title: string;
  href: string;
  iconClass: string;
};
declare const loginSocialLinks: LoginSocialLinkData[];
//#endregion
//#region src/components/container/page.d.ts
type PageContainerProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};
declare function PageContainer({
  title,
  children,
  className,
  innerClassName
}: PageContainerProps): import("react").JSX.Element;
//#endregion
//#region src/components/container/highlight.d.ts
declare function Highlight({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}): import("react").JSX.Element;
//#endregion
//#region src/components/container/leftBarPanel.d.ts
type LeftBarPanelProps = {
  color: string;
  children: ReactNode;
  className?: string;
};
declare function LeftBarPanel({
  color,
  children,
  className
}: LeftBarPanelProps): import("react").JSX.Element;
//#endregion
//#region src/components/container/glassCard.d.ts
type GlassCardProps = {
  children: ReactNode;
  className?: string;
};
declare function GlassCard({
  children,
  className
}: GlassCardProps): import("react").JSX.Element;
//#endregion
//#region src/components/container/iconBubble.d.ts
declare const tones: {
  readonly amber: "bg-amber-500/10 text-amber-400";
  readonly blue: "bg-sky-500/10 text-sky-400";
  readonly emerald: "bg-emerald-500/10 text-emerald-400";
  readonly rose: "bg-rose-500/10 text-rose-400";
  readonly slate: "bg-login-600 text-login-100";
  readonly violet: "bg-violet-500/10 text-violet-400";
  readonly orange: "bg-login/10 text-login";
};
type IconBubbleProps = {
  icon: ElementType;
  tone?: keyof typeof tones;
  size?: 'sm' | 'md' | 'lg';
};
type IconBubbleTone = keyof typeof tones;
declare function IconBubble({
  icon: Icon,
  tone,
  size
}: IconBubbleProps): import("react").JSX.Element;
//#endregion
//#region src/components/container/statCard.d.ts
type StatCardProps = {
  label: string;
  value: string;
  icon: ElementType;
  tone?: IconBubbleTone;
};
declare function StatCard({
  label,
  value,
  icon,
  tone
}: StatCardProps): import("react").JSX.Element;
//#endregion
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
//#region src/components/container/accordion.d.ts
type AccordionProps = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
};
type AccordionGroupProps = {
  children: ReactNode;
  className?: string;
};
declare function AccordionGroup({
  children,
  className
}: AccordionGroupProps): import("react").JSX.Element;
declare function Accordion({
  title,
  children,
  defaultOpen,
  className
}: AccordionProps): import("react").JSX.Element;
//#endregion
//#region src/components/container/pulseDot.d.ts
type PulseDotVariant = 'online' | 'offline' | 'warning' | 'unknown';
type PulseDotProps = {
  variant?: PulseDotVariant;
  size?: 'sm' | 'md' | 'lg';
};
declare function PulseDot({
  variant,
  size
}: PulseDotProps): import("react").JSX.Element;
//#endregion
//#region src/components/version/version.d.ts
type VersionTagProps = {
  version?: string;
  url?: string;
  className?: string;
};
declare function VersionTag({
  version,
  url,
  className
}: VersionTagProps): import("react").JSX.Element | undefined;
//#endregion
//#region src/components/login/loginPage.d.ts
declare function LoginPage({
  title,
  description,
  redirectPath,
  version,
  btg,
  handleSubmit,
  guestRedirectPath,
  guestText
}: LoginPageProps): import("react").JSX.Element;
//#endregion
//#region src/components/toast/toaster.d.ts
declare function toast(message: string, type: ToastType, duration?: number): void;
declare namespace toast {
  var info: (message: string, duration?: number) => void;
  var success: (message: string, duration?: number) => void;
  var warning: (message: string, duration?: number) => void;
  var error: (message: string, duration?: number) => void;
}
declare function Toaster(): import("react").JSX.Element;
//#endregion
//#region src/components/buttons/button.d.ts
type ButtonProps = {
  text?: string;
  className?: string;
  icon?: string | JSX.Element;
  path?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'info';
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
};
declare function Button({
  text,
  className,
  icon,
  path,
  variant,
  type,
  onClick,
  disabled
}: ButtonProps): JSX.Element;
//#endregion
//#region src/components/alert/alert.d.ts
type AlertProps = {
  children: ReactNode;
  variant?: 'warning' | 'info';
  className?: string;
};
declare function Alert({
  children,
  variant,
  className
}: AlertProps): import("react").JSX.Element;
//#endregion
//#region src/components/table/menu.d.ts
declare function MenuButton({
  icon,
  text,
  hotKey,
  onClick,
  className
}: {
  icon: React$1.ReactNode;
  text: string;
  hotKey?: string;
  onClick: () => void;
  className?: string;
}): React$1.JSX.Element;
//#endregion
//#region src/components/table/table.d.ts
type TableProps = {
  data: object[];
  columns: Column[];
  menuItems?: (data: object, id: string) => React.ReactNode;
  redirectPath?: string | {
    path: string;
    key?: string;
  };
  variant?: 'default' | 'minimal';
  idKey?: string;
};
declare function Table({
  data,
  columns,
  menuItems,
  redirectPath,
  variant,
  idKey
}: TableProps): import("react").JSX.Element;
//#endregion
//#region src/components/table/pagination.d.ts
type PaginationProps = {
  pageSize?: number;
  totalRows?: number;
};
declare function Pagination({
  pageSize,
  totalRows
}: PaginationProps): import("react").JSX.Element;
//#endregion
//#region src/components/markdownrender/markdownRender.d.ts
declare function MarkdownRender({
  MDstr,
  components,
  className,
  size
}: {
  MDstr: string;
  components?: Components;
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl';
}): import("react").JSX.Element;
//#endregion
//#region src/components/confirm/confirmPopup.d.ts
type ConfirmPopupProps = {
  isOpen: boolean;
  header: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'default';
};
declare function ConfirmPopup({
  isOpen,
  header,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  variant
}: ConfirmPopupProps): import("react").JSX.Element | null;
//#endregion
//#region src/components/vulnerability/constants.d.ts
type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'unknown';
//#endregion
//#region src/components/vulnerability/severityPill.d.ts
type SeverityPillProps = {
  severity: SeverityLevel;
  count: number;
  compact?: boolean;
};
declare function SeverityPill({
  severity,
  count,
  compact
}: SeverityPillProps): import("react").JSX.Element | null;
//#endregion
//#region src/components/inputs/toggle.d.ts
type ToggleOption<T> = {
  value: T;
  label?: string;
  text?: string;
  icon?: React.ReactNode;
};
type ToggleProps<T> = {
  value: T;
  onChange: (value: T) => void;
  left: ToggleOption<T>;
  right: ToggleOption<T>;
};
declare function Toggle<T>({
  value,
  onChange,
  left,
  right
}: ToggleProps<T>): import("react").JSX.Element;
//#endregion
export { Accordion, AccordionGroup, Alert, type BilingualString, Button, Checkbox, ConfirmPopup, Footer, type FooterColumn, type FooterProps, type FooterSocialLink, GlassCard, Highlight, IconBubble, Input, type Lang, LanguageToggle, LeftBarPanel, LoginPage, type LoginSocialLinkData, Logo, LogoSmall, MarkdownRender, MenuButton, MultiSelect, NavDropdown, NavItem, Navbar, PageContainer, Pagination, PulseDot, Radio, Range, SearchInput, Select, SeverityPill, StatCard, Switch, TabPanel, Table, Tabs, TagInput, Textarea, ThemeToggle, Toaster, Toggle, VersionTag, loginAddress, loginCopyright, loginEmail, loginSocialLinks, loginSponsor, toast };