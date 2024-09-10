import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import ReportTable from '../../components/home/report/ReportTable';
import fetchWithToken from '../../utils/fetchWithToken';
import { useRoute } from '@react-navigation/native';
import Header from '../../components/Header';
import { Icon } from 'react-native-paper';

const ReportScreen = ({ navigation }) => {
	const [search, setSearch] = useState('');

	const [reports, setReports] = useState([]);
	const route = useRoute()
	const { league } = route.params;

	const [scheduledata, setScheduleData] = useState(null);

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
		<View style={styles.container}>
			<Header title="Manage Reports" />
			<View style={styles.table}>
				<View style={styles.input}>
					<TextInput
						placeholder="Search..."
						value={search}
						onChangeText={setSearch}
						style={{ fontFamily: "Poppins_400Regular" }}
					/>
					<Icon source="magnify" size={20} />
				</View>

				<ReportTable
					reports={
						reports
							.filter(
								report => report.name.toLowerCase().includes(search.toLowerCase())
									|| report.description.toLowerCase().includes(search.toLowerCase())
							)
					}
					// scheduledata={scheduledata}
					league={league}
				// setScheduleData={setScheduleData}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#181928",
		padding: 16,
	},
	table: {
		padding: 15
	},
	input: {
		height: 50,
		backgroundColor: 'white',
		borderRadius: 15,
		marginBottom: 10,
		paddingHorizontal: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
});

export default ReportScreen;