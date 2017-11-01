import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App.coffee'
import sw from '../sw.ts'

ReactDOM.render(
    <App/>,
    document.getElementById('coffee')
)
sw()