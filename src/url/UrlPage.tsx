import * as React from "react"
import { useParams } from "react-router-dom"
import { ConfigHelper } from "../components"

export function UrlPage() {
  const params = useParams();
  const linkObject = ConfigHelper.current.tabs.filter(t => t.id === params.id)[0]
  return (<iframe title="content" className="full-frame" src={linkObject.url} />);
}
