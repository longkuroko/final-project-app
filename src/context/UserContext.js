import React, { createContext, useReducer } from 'react'

export const UserContext = createContext()

export const USER_ACTION = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	REGISTER: 'REGISTER'
}

const UserInitialState = {
	username: null,
	token: null
}

const reducer = (state, action) => {
	switch (action.type) {
		case USER_ACTION.LOGIN:
      // luu async
			return { ...state, token: action.token }

		case USER_ACTION.LOGOUT:
			return { ...state, token: null }

		case USER_ACTION.REGISTER:
			return { ...state, account: action.account, navigate: action.navigate }

		default:
			return state
	}
}

const AppContext = props => {
	const [store, dispatch] = useReducer(reducer, UserInitialState)
	const userProps = {
		state: store,
		login: (type, token) => dispatch({ type, token }),
		logout: type => dispatch({ type }),
		loginAfterSignup: (type, account, navigate) =>
			dispatch({ type, account, navigate })
	}

	return (
		<UserContext.Provider value={userProps}>
			{props.children}
		</UserContext.Provider>
	)
}

export default AppContext
