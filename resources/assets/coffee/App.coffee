import * as React from 'react'
import style from 'assets/sass/style.scss'

export default class App extends React.Component
    constructor: (props) ->
      super(props)
    render: ->
        <p className={style.main}>
            Lorem <sub className={style.main_data}>Coffee</sub>
        </p>

