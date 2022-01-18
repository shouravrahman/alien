import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import 'react-quill/dist/quill.snow.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'
import './index.css'
import rootReducer from './reducers'

const store = createStore(rootReducer, composeWithDevTools())
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,

	document.getElementById('root')
)
