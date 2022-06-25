import * as React from "react"
import { ConfigHelper, EnvironmentHelper } from "../components"

export function LessonsPage() {
  return (
    <iframe title="content" className="full-frame" src={EnvironmentHelper.Common.LessonsRoot + "/b1/" + ConfigHelper.current.church.id} />
  )
}
