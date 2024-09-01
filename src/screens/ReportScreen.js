import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import backgroundImage from '../assets/images/bg.jpg';
import logoImage from '../assets/images/logo.png'
import { useEffect, useState } from 'react';
import ReportTable from '../components/ReportTable';
import fetchWithToken from '../utils/fetchWithToken';
import { useRoute } from '@react-navigation/native';
import Header from '../components/Header';

const ReportScreen = ({ navigation }) => {
	const [search, setSearch] = useState('');

	const [reports, setReports] = useState([]);
	const route = useRoute()
	const { league } = route.params;

	const [scheduledata, setScheduleData] = useState({});

	useEffect(() => {
		fetchWithToken(
			"https://fantasycastcentral.com/api/user/report/list",
			{
				method: "GET"
			}
		)
			.then(response => {
				response.json().then(
					data => setReports([...data.data])
				)
			});

		fetchWithToken(
			"https://fantasycastcentral.com/api/user/schedule/get",
			{
				method: "POST",
				body: JSON.stringify({ league: league.league_id })
			}
		)
			.then(
				response => {
					response.json().then(
						data => setScheduleData(data.data)
					)
				}
			)
	}, [])

	return (
		<ImageBackground source={backgroundImage} style={styles.image}>
			<View style={styles.container}>
				<Header />
				<View style={styles.tableBg}>
					<Text style={styles.title}>
						Manage Reports
					</Text>
					<View style={styles.table}>
						<TextInput
							placeholder="Search..."
							value={search}
							onChangeText={setSearch}
							style={styles.input}
						/>
						<ScrollView style={{ maxHeight: "80%" }}>
							<ReportTable reports={reports} scheduledata={scheduledata} />
						</ScrollView>
					</View>
				</View>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	tableBg: {
		display: "flex",
		gap: 20,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		padding: 15,
		marginTop: 30
	},
	table: {
		backgroundColor: "white",
		padding: 15
	},
	logo: {
		width: "20%",
		height: "8%",
		resizeMode: "contain"
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
	},
	title: {
		marginTop: 20,
		backgroundColor: 'rgb(73, 163, 241)',
		padding: 10,
		color: "white",
		fontSize: 30,
		borderRadius: 10,
		width: "90%",
		textAlign: "center",
		alignSelf: "center",
		marginTop: -40
	},
	form: {
		display: "flex",
		gap: 10,
		padding: 15,
		backgroundColor: 'rgba(35, 43, 85, .75)',
		borderRadius: 5,
		borderTopColor: "rgba(255,255,255,.5)",
		borderTopWidth: 1
	},
	input: {
		height: 40,
		backgroundColor: 'white',
		borderRadius: 5,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 8,
	},
});

export default ReportScreen;