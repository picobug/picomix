import * as React from "react"

export interface Props {
	name?: string
}

export class App extends React.Component<Props, {}> {
	public static defaultProps: Partial<Props> = {
		name: "Typescript"
	}
	public render() {
		return (
			<p>
				Lorem <sub>{this.props.name}</sub>
			</p>
		)
	}
}
