import React from "react";
import { PersonHelper, ConfigHelper } from "../../helpers";
import { ApiHelper } from "../../components";
import { Link, Redirect } from "react-router-dom";
import { FormSubmissionEdit, Loading } from "../../appBase/components";

interface Props { formId: string }

export const Form: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [restrictedForm, setRestrictedForm] = React.useState<boolean>(true);
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(null);
  const [addFormId, setAddFormId] = React.useState<string>("");
  const [unRestrictedFormId, setUnRestrictedFormId] = React.useState<string>("");
  const [redirectTo, setRedirectTo] = React.useState<string>("");

  const loadData = () => {
    setLoading(true);
    ApiHelper.get("/forms/standalone/" + props.formId + "?churchId=" + ConfigHelper.churchId, "MembershipApi").then(data => {
      setRestrictedForm(data.restricted);
      if (data.restricted) setAddFormId(props.formId);
      else setUnRestrictedFormId(props.formId);
      setLoading(false);
    });
  }

  const handleUpdate = () => { setFormSubmitted(true); }
  const showForm = () => <FormSubmissionEdit churchId={ConfigHelper.churchId} addFormId={addFormId} unRestrictedFormId={unRestrictedFormId} contentType="form" contentId={props.formId} formSubmissionId="" personId={PersonHelper?.person?.id} updatedFunction={handleUpdate} cancelFunction={ () => setRedirectTo("/")} />
  const getForm = () => {
    if (loading) return <Loading />;
    if (!restrictedForm) return showForm();
    if (!PersonHelper?.person?.id) return <h3 className="text-center"><Link to={"/login?returnUrl=/forms/" + props.formId}>Login</Link> to view this form.</h3>;
    return formSubmitted ? <h3 className="text-center">Your form has been successfully submitted. <Link to={"/"}>Return Home</Link></h3> : showForm();
  }

  React.useEffect(() => loadData(), [loadData, props.formId]);

  if (redirectTo) return <Redirect to={redirectTo} />;
  else return (<>{ getForm() }</>);
}
