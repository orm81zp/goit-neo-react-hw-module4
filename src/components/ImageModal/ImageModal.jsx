import { FaUser } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import Modal from "react-modal";
import { ROOT_CONTAINER } from "../../const";
import css from "./ImageModal.module.css";

Modal.setAppElement(ROOT_CONTAINER);

const ImageModal = ({ isOpen, onClose, image }) => {
  const {
    description,
    alt_description,
    likes,
    user,
    urls: { regular },
  } = image;

  const alt = alt_description || description;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.content}>
        <img src={regular} alt={alt} />
        <div className={css.footer}>
          {description && (
            <h3 className={css.description} title={description}>
              {description}
            </h3>
          )}
          {user && (
            <div className={css.footerRow}>
              <FaUser />{" "}
              <span>
                {user.name}
                {user.location && ` (${user.location})`}
              </span>
            </div>
          )}
          {likes && (
            <div className={css.footerRow}>
              <FcLike /> <span>{likes}</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
