//import styles from "./styles.module.css";

interface TextProps {
  children: string;
}

const Text = ({ children, ...props }: TextProps): JSX.Element => {
  return <div {...props}>{children}</div>;
};

export default Text;
