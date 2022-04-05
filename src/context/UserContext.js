import React, { createContext, useReducer } from 'react'

export const UserContext = createContext()

export const USER_ACTION = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT'
}

const UserInitialState = {
	token: null
}

const reducer = (state, action) => {
	switch (action.type) {
		case USER_ACTION.LOGIN:
			return { ...state, token: action.token }

		case USER_ACTION.LOGOUT:
			return { ...state, token: null }

		default:
			return state
	}
}

const AppContext = props => {
	const [store, dispatch] = useReducer(reducer, UserInitialState)
	const userProps = {
		state: store,
		login: (type, token) => dispatch({ type, token }),
		logout: type => dispatch({ type })
	}

	return (
		<UserContext.Provider value={userProps}>
			{props.children}
		</UserContext.Provider>
	)
}

export default AppContext
