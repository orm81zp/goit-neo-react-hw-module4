import classNames from "clsx";

import css from "./Button.module.css";
import { TYPES, VARIENTS } from "./const";

const Button = ({ onClick, children, varient, type = TYPES.BUTTON }) => {
  const clickHandler = (event) => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  return (
    <button
      className={classNames(css.button, {
        [css[varient]]: !!varient,
      })}
      type={type}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

Button.varients = Object.assign({}, VARIENTS);
Button.types = Object.assign({}, TYPES);

export default Button;
