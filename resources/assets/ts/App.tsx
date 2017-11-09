import * as React from "react"
const style = require("assets/sass/style.scss")

export interface Props {
	name?: string
}

export class App extends React.Component<Props, {}> {
	public static defaultProps: Partial<Props> = {
		name: "Typescript"
	}
	public render() {
		return (
			<p className={style.main}>
				Lorem <sub className={style.main_data}>{this.props.name}</sub>
			</p>
		)
	}
}
