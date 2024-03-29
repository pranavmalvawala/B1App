import React from "react";
import { PageInterface, ApiHelper, InputBox, UniqueIdHelper, EnvironmentHelper } from "."
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { TextField } from "@mui/material";

interface Props { page: PageInterface, updatedFunction: () => void }

export const PageEdit: React.FC<Props> = (props) => {
  const [page, setPage] = React.useState<PageInterface>(null);
  const [editorState, setEditorState] = React.useState<EditorState>(EditorState.createEmpty());

  const handleDelete = () => {
    if (window.confirm("Are you sure you wish to permanently delete this page?")) {
      ApiHelper.delete("/pages/" + page.id, "B1Api").then(() => { setPage(null); props.updatedFunction(); });
    }
  }
  const checkDelete = () => { if (!UniqueIdHelper.isMissing(page?.id)) return handleDelete; else return null; }
  const handleCancel = () => { props.updatedFunction(); }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = e.currentTarget.value;
    let p = { ...page };
    switch (e.currentTarget.name) {
      case "name": p.name = val; break;
      //case "type": t.tabType = val; break;
      //case "page": t.tabData = val; break;
      //case "url": t.url = val; break;
    }
    setPage(p);
  }

  const handleSave = () => {
    let content = editorState.getCurrentContent();
    page.content = draftToHtml(convertToRaw(content));
    ApiHelper.post("/pages", [page], "B1Api").then(props.updatedFunction);
  }

  const handleEditorChange = (e: EditorState) => {
    setEditorState(e);
  }

  const init = () => {
    setPage(props.page);
    if (UniqueIdHelper.isMissing(props.page.id)) setEditorState(EditorState.createWithContent(ContentState.createFromText("")));
    else {
      const path = `${EnvironmentHelper.Common.ContentRoot}/${props.page.churchId}/pages/${props.page.id}.html?ts=${new Date().getTime().toString()}`;
      fetch(path)
        .then(response => response.text())
        .then(content => {
          const draft = htmlToDraft(content)
          setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(draft.contentBlocks)));
        })
    }
  }

  React.useEffect(init, [props.page]);

  return (
    <InputBox headerIcon="code" headerText="Edit Page" saveFunction={handleSave} cancelFunction={handleCancel} deleteFunction={checkDelete()}>
      <TextField fullWidth label="Page Name" name="name" value={page?.name || ""} onChange={handleChange} />
      <label>Contents</label>
      <Editor editorState={editorState} onEditorStateChange={handleEditorChange} editorStyle={{ height: 200 }} />
    </InputBox>
  );
}
