import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import Container from "../Container/Container";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const search = form.elements.search.value.trim();

    if (!search) {
      toast.error("Text must be entered to search for images.");
      return;
    }

    onSubmit(search);
    form.reset();
  };

  return (
    <header>
      <Container>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Search images and photos"
            autoFocus
          />
          <button type="submit">
            <FaTrash />
            Search
          </button>
        </form>
        <Toaster />
      </Container>
    </header>
  );
};

export default SearchBar;
