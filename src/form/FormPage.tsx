import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components";
import { Form } from "./components/Form";

export const FormPage = () => {
  const params = useParams();
  return (<>
    <Header></Header>
    <div className="container">
      <Form formId={params.id}></Form>
    </div>
  </>);
}
