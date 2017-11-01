import * as React from "react"
import * as ReactDom from "react-dom"
import { App } from "./App"

ReactDom.render(<App name="Hello World!" />, document.getElementById(
	"ts"
) as HTMLElement)