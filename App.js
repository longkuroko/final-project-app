import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
	return (
		<View style={styles.container}>
			<Text>
				Open up App.js to start working on your app fasfsdfasfasdfasdfas
				asdfasfasfasdfasdfasdfasdfasd fasfasfasdfasdfa
				asfasadfasdfasdfasdfasdfasdff! fasdjfaslfjaslfjasdlfjdaslfjasdlfjsaldfja
				dfasdfsdf asfdasdf asdf slfjasldfjsaldfjsladfjaslfjasd fasdfasfasdfasdfasdfsafasfasdf
			</Text>
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
