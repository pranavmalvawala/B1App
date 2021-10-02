import * as React from "react"
import { useQuery } from "../hooks/useQuery"

export function UrlPage() {
  const query = useQuery()

  return (
    <iframe title="content" className="full-frame" src={query.get("link")} />
  )
}
