import React from "react";
import { PersonHelper, ConfigHelper } from "../../helpers";
import { ApiHelper } from "../../components";
import { Link, Redirect } from "react-router-dom";
import { FormSubmissionEdit, Loading } from "../../appBase/components";
import { DateHelper } from "../../appBase/helpers";

interface Props { formId: string }

export const Form: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [restrictedForm, setRestrictedForm] = React.useState<boolean>(true);
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(null);
  const [addFormId, setAddFormId] = React.useState<string>("");
  const [unRestrictedFormId, setUnRestrictedFormId] = React.useState<string>("");
  const [redirectTo, setRedirectTo] = React.useState<string>("");
  const [early, setEarly] = React.useState<Date>(null);
  const [late, setLate] = React.useState<Date>(null);

  const loadData = () => {
    setLoading(true);
    ApiHelper.get("/forms/standalone/" + props.formId + "?churchId=" + ConfigHelper.churchId, "MembershipApi").then(data => {
      let now = new Date().setHours(0, 0, 0, 0);
      let start = data.accessStartTime ? new Date(data.accessStartTime) : null;
      let end = data.accessEndTime ? new Date(data.accessEndTime) : null;
      if (start && start.setHours(0, 0, 0, 0) > now) setEarly(start);
      if (end && end.setHours(0, 0, 0, 0) < now) setLate(end);
      setRestrictedForm(data.restricted);
      if (data.restricted) setAddFormId(props.formId);
      else setUnRestrictedFormId(props.formId);
      setLoading(false);
    });
  }

  const handleUpdate = () => setFormSubmitted(true);
  const showForm = () => <FormSubmissionEdit churchId={ConfigHelper.churchId} addFormId={addFormId} unRestrictedFormId={unRestrictedFormId} contentType="form" contentId={props.formId} formSubmissionId="" personId={PersonHelper?.person?.id} updatedFunction={handleUpdate} cancelFunction={() => setRedirectTo("/")} />
  const getForm = () => {
    if (loading) return <Loading />;
    if (early) return <h3 className="text-center">This form isn't available until {DateHelper.prettyDateTime(early)}</h3>
    if (late) return <h3 className="text-center">This form closed on {DateHelper.prettyDateTime(late)}</h3>
    if (!restrictedForm || PersonHelper?.person?.id) return showForm();
    if (!PersonHelper?.person?.id) return <h3 className="text-center"><Link to={"/login?returnUrl=/forms/" + props.formId}>Login</Link> to view this form.</h3>;
    return <></>;
  }

  React.useEffect(() => loadData(), [props.formId]); //eslint-disable-line

  if (redirectTo) return <Redirect to={redirectTo} />;
  else return (
    <>{formSubmitted ? <h3 className="text-center">Your form has been successfully submitted.</h3> : getForm()}</>
  );
}
