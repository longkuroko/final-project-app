import React, { createContext, useReducer } from 'react'

export const UserContext = createContext()

export const USER_ACTION = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT'
}

const UserInitialState = {
	login: false
}

const reducer = (state, action) => {
	switch (action.type) {
		case USER_ACTION.LOGIN:
			return { ...state, login: true }

		case USER_ACTION.LOGOUT:
			return { ...state, login: false }

		default:
			return state
	}
}

const AppContext = props => {
	const [store, dispatch] = useReducer(reducer, UserInitialState)
	const userProps = {
		state: store,
		verify: type => dispatch({ type })
	}

	return (
		<UserContext.Provider value={userProps}>
			{props.children}
		</UserContext.Provider>
	)
}

export default AppContext
