import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import PropTypes from "prop-types";

function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFiledId = useId();
  const phoneRegEx = /^([1-9]{3})(-[1-9]{2}){2}$/;

  const initValues = {
    name: "",
    number: "",
  };

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .matches(phoneRegEx, "Phone number is not valid")
      .required("Required"),
  });

  function handleSubmit(values, actions) {
    dispatch(addContact(values));
    actions.resetForm();
  }

  return (
    <div className={css.formWrapper}>
      <Formik
        initialValues={initValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <div className={css.formInput}>
            <label htmlFor={nameFieldId}>Name:</label>

            <Field type="text" name="name" id={nameFieldId} />

            <ErrorMessage name="name" component="span" />
          </div>

          <div className={css.formInput}>
            <label htmlFor={numberFiledId}>Number:</label>

            <Field type="text" name="number" id={numberFiledId} />

            <ErrorMessage name="number" component="span" />
          </div>

          <button className={css.button} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
}

ContactForm.propTypes = {
  addNew: PropTypes.func,
};

export default ContactForm;
