import { IoCallSharp, IoPersonSharp } from "react-icons/io5";
import css from "./Contact.module.css";
import PropTypes from "prop-types";
import { deleteContact } from "../../redux/contactsSlice.js";
import { useDispatch } from "react-redux";

function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteContact(id));
  }
  return (
    <div className={css.contact}>
      <div className={css.content}>
        <span>
          <IoPersonSharp /> {name}
        </span>

        <span>
          <IoCallSharp /> {number}
        </span>
      </div>

      <button className={css.deleteButton} onClick={() => handleDelete()}>
        Delete
      </button>
    </div>
  );
}

Contact.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};

export default Contact;
