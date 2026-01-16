import { useState } from "react";
import { createEvent } from "../api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  date: Yup.date().required("Date is required"),
  location: Yup.string().required("Location is required"),
  user_id: Yup.number().required("User ID is required"),
});

export default function CreateEvent() {
  const [success, setSuccess] = useState("");

  return (
    <div>
      <h1>Create Event</h1>
      <Formik
        initialValues={{ title: "", description: "", date: "", location: "", user_id: "" }}
        validationSchema={EventSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createEvent(values);
            setSuccess("Event created successfully!");
            resetForm();
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <Form>
          <div>
            <label>Title:</label>
            <Field name="title" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label>Description:</label>
            <Field name="description" />
            <ErrorMessage name="description" component="div" />
          </div>
          <div>
            <label>Date (YYYY-MM-DD):</label>
            <Field name="date" />
            <ErrorMessage name="date" component="div" />
          </div>
          <div>
            <label>Location:</label>
            <Field name="location" />
            <ErrorMessage name="location" component="div" />
          </div>
          <div>
            <label>User ID:</label>
            <Field name="user_id" type="number" />
            <ErrorMessage name="user_id" component="div" />
          </div>
          <button type="submit">Create Event</button>
        </Form>
      </Formik>
      {success && <p>{success}</p>}
    </div>
  );
}
