import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./App"
import sw from "../sw"

ReactDOM.render(<App />, document.getElementById("js"))
sw()
