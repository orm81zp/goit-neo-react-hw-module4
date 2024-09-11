import Button from "../Button/Button";
import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={css.container}>
      <Button onClick={onClick} varient="primary">Load more</Button>
    </div>
  );
};

export default LoadMoreBtn;
