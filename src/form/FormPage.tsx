import React from "react";
import { useParams } from "react-router-dom";
import { Form } from "./components/Form";

export const FormPage = () => {
  const params = useParams();
  return (<Form formId={params.id}></Form>);
}
