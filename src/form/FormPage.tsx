import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Header } from "../components";
import { Form } from "./components/Form";

type TParams = { churchId: string, id: string };

export const FormPage = ({ match }: RouteComponentProps<TParams>) => (
  <>
    <Header></Header>
    <div className="container">
      <Form formId={match.params.id}></Form>
    </div>
  </>
)
