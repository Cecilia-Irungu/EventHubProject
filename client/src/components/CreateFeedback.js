import { useState } from "react";
import { createFeedback } from "../api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FeedbackSchema = Yup.object().shape({
  rating: Yup.number().min(1).max(5).required("Rating is required"),
  comment: Yup.string().required("Comment is required"),
  user_id: Yup.number().required("User ID is required"),
  event_id: Yup.number().required("Event ID is required"),
});

export default function CreateFeedback() {
  const [success, setSuccess] = useState("");

  return (
    <div>
      <h1>Leave Feedback</h1>
      <Formik
        initialValues={{ rating: "", comment: "", user_id: "", event_id: "" }}
        validationSchema={FeedbackSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createFeedback(values);
            setSuccess("Feedback submitted!");
            resetForm();
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <Form>
          <div>
            <label>Rating (1-5):</label>
            <Field name="rating" type="number" />
            <ErrorMessage name="rating" component="div" />
          </div>
          <div>
            <label>Comment:</label>
            <Field name="comment" />
            <ErrorMessage name="comment" component="div" />
          </div>
          <div>
            <label>User ID:</label>
            <Field name="user_id" type="number" />
            <ErrorMessage name="user_id" component="div" />
          </div>
          <div>
            <label>Event ID:</label>
            <Field name="event_id" type="number" />
            <ErrorMessage name="event_id" component="div" />
          </div>
          <button type="submit">Submit Feedback</button>
        </Form>
      </Formik>
      {success && <p>{success}</p>}
    </div>
  );
}
