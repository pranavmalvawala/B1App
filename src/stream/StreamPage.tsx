import * as React from "react"
import { Container } from "react-bootstrap"
import { ConfigHelper, EnvironmentHelper } from "../components"

export function StreamPage() {
  return (
    <Container>
      <iframe title="content" className="w-100 vh-85" src={EnvironmentHelper.StreamingLiveAppUrl.replace("{key}", ConfigHelper.current.church.subDomain)} />
    </Container>
  )
}
