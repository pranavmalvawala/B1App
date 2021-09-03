import React from "react";
import { PersonHelper } from "../../helpers";
import { ApiHelper } from "../../components";
import { Link } from "react-router-dom";
import { FormSubmissionEdit, Loading } from "../../appBase/components";

interface Props { formId: string }

export const Form: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [restrictedForm, setRestrictedForm] = React.useState<boolean>(null);
  const [member, setMember] = React.useState<any>(null);
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(null);

  const loadData = () => {
    ApiHelper.getAnonymous("/forms/access/" + props.formId, "MembershipApi").then(result => {
      setRestrictedForm(result.restricted);
      if (result.restricted) {
        ApiHelper.get("/memberpermissions/form/" + props.formId, "MembershipApi").then(data => {
          setMember(data[0]);
          setLoading(false);
        });
      } else setLoading(false);
    });
  }

  const handleUpdate = () => { setFormSubmitted(true); }

  const showForm = () => <FormSubmissionEdit addFormId={props.formId} contentType="form" contentId={props.formId} formSubmissionId="" updatedFunction={handleUpdate} />

  const isLoading = loading || (PersonHelper?.person?.id && member === null);

  const getForm = () => {
    if (isLoading) return <Loading />;
    if (!restrictedForm) return showForm();
    if (!PersonHelper?.person?.id) return <h3 style={{textAlign: "center"}}><Link to={"/login?returnUrl=/forms/" + props.formId}>Login</Link> to view this form.</h3>;
    if (!member?.id) return <h3>You are not authorized to view this form.</h3>;
    return formSubmitted ? <h1>Form submitted</h1> : showForm();
  }

  React.useEffect(() => loadData(), [loadData, props.formId]);

  return (
    <>
      { getForm() }
    </>
  );
}
