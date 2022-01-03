import React from "react";
import { Theme, EnvironmentHelper } from "./components";
import { useParams } from "react-router-dom";

export const Page = () => {
  const params = useParams();
  const [content, setContent] = React.useState("");

  const init = React.useCallback(async () => {
    const path = `${EnvironmentHelper.ContentRoot}/${params.churchId}/pages/${params.id}.html?ts=${new Date().getTime().toString()}`;
    fetch(path)
      .then(response => response.text())
      .then(c => { setContent(c) });
  }, [params.id, params.churchId]);

  React.useEffect(() => {
    init()
  }, [init]);

  return (
    <div style={{ backgroundColor: "#FFF", height: "100vh" }}>
      <Theme />
      <div dangerouslySetInnerHTML={{ __html: content }} style={{ padding: 5 }} />
    </div>);
}
