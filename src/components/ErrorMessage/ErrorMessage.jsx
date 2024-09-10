import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};

export default ErrorMessage;
