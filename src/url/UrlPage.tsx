import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import { ConfigHelper } from "../components"

interface Props extends RouteComponentProps<{ id: string }> {}

export function UrlPage(props: Props) {
  const { id } = props.match.params

  const linkObject = ConfigHelper.current.tabs.filter(t => t.id === id)[0]
  return (
    <iframe title="content" className="full-frame" src={linkObject.url} />
  )
}
