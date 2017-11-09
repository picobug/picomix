import * as React from "react"
import style from "./style.css"
console.log(style)

export default class App extends React.Component {
	render() {
		return (
			<p className={style.main}>
				Lorem <sub className={style.main_data}>Javascript</sub>
			</p>
		)
	}
}
