import * as React from "react"
import { Container } from "react-bootstrap"
import { useQuery } from "../hooks/useQuery"

export function UrlPage() {
  const query = useQuery()

  return (
    <Container>
      <iframe title="content" className="w-100 vh-85" src={query.get("link")} />
    </Container>
  )
}
