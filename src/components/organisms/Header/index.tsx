import styles from "./styles.module.css";

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>Popre</h1>
    </header>
  );
};

export default Header;
