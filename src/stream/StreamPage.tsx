import * as React from "react"
import { ConfigHelper, EnvironmentHelper } from "../components"

export function StreamPage() {
  return (
    <iframe title="content" className="full-frame" src={EnvironmentHelper.Common.StreamingLiveRoot.replace("{key}", ConfigHelper.current.church.subDomain)} />
  )
}
