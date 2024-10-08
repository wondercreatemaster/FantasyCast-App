import React, { useEffect, useState } from 'react';
import { Button, DataTable, Dialog, Divider, IconButton, Portal } from 'react-native-paper';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import SoundPlayer from '../../SoundPlayer';
import { CheckBox } from '@rneui/themed';
import fetchWithToken from '../../../utils/fetchWithToken';


const types = [
	{ label: 'Text', value: "1" },
	{ label: 'Text & Audio', value: "2" },
]

const days = [
	"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
]

const ReportTableRow = ({ report, scheduled, league, setScheduleData }) => {


	const [runnowDlg, setRunnowDlg] = useState(false);
	const [scheduleDlg, setScheduleDlg] = useState(false);
	const [voices, setVoices] = useState([]);
	const [voicelist, setVoicelist] = useState([]);
	const [voice, setVoice] = useState(null)

	const [schedulelist, setSchedulelist] = useState(report.schedule_list);

	const [scheduleState, setScheduleState] = useState(
		Array(7).fill(false)
	)

	const [isLoading, setIsLoading] = useState(false);

	const handleCheckbox = (index) => {
		let save = scheduleState;
		save[index] = !save[index];
		setScheduleState([...save]);
	}

	useEffect(() => {
		if (scheduled != undefined)
			setScheduleState(
				[...Array(7)
					.fill(false)
					.map(
						(_, index) => scheduled.some(item => item == index))]
			);
	}, [scheduled, scheduleDlg])

	useEffect(() => {
		setVoice(null)
	}, [scheduleDlg, runnowDlg])

	useEffect(() => {
		fetchWithToken(
			"https://fantasycastcentral.com/api/user/reportlog/voice/list",
			{
				method: "GET"
			}
		)
			.then(async response => {
				const data = await response.json();
				setVoices(data.data);
				let save = data.data?.map(item => {
					return {
						value: item['voice_id'],
						label: item['name'],
						audioURL: item['preview_url']
					}
				})
				setVoicelist([...save])
			})
	}, [])

	const showRunnow = () => setRunnowDlg(true);

	const hideRunnow = () => {
		setRunnowDlg(false);
		setEmail("");
		setEmailList([]);
	}

	const showSchedule = () => setScheduleDlg(true);

	const hideSchedule = () => setScheduleDlg(false);

	const handleScheduleUpdate = () => {
		fetchWithToken(
			"https://fantasycastcentral.com/api/user/schedule/update",
			{
				method: "POST",
				body: JSON.stringify({
					league: league.league_id,
					report_schedule: {
						[report._id]: scheduleState.map(
							(item, index) => (item ? index : -1)
						)
							.filter(index => index > -1)
					}
				})
			}
		)
			.then(
				async response => {
					const data = await response.json();
					setScheduleData(data.schedule);
					Alert.alert("Schedule Updated!")
				}
			)
	}

	const [type, setType] = useState('1')

	const [email, setEmail] = useState('')
	const [emailList, setEmailList] = useState([]);

	const handleRunReport = () => {
		setIsLoading(true);
		if (report.voice_id == "")
			fetchWithToken(
				"https://fantasycastcentral.com/api/user/generate/matchup/before",
				{
					method: "POST",
					body: JSON.stringify({
						league: league.league_id,
						original: 0,
						recipient: emailList,
						reportId: report._id,
						reportType: 0
					})
				}
			)
				.then(
					async response => {
						const data = await response.json();
						setIsLoading(false);
						Alert.alert(data.message);
					}
				)
		else
			fetchWithToken(
				"https://fantasycastcentral.com/api/user/generate/rank",
				{
					method: "POST",
					body: JSON.stringify({
						league: league.league_id,
						original: 0,
						recipient: emailList,
						reportId: report._id,
						reportType: 0
					})
				}
			)
				.then(
					async response => {
						const data = await response.json();
						setIsLoading(false);
						Alert.alert(data.message);
					}
				)
	}

	return (
		<KeyboardAvoidingView style={{ borderBottomWidth: 1.3, borderColor: "#2E2F3E" }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<View style={styles.cell}>
				<Text className="text-base text-white" style={{ fontFamily: "Poppins_500Medium" }}>
					{report.description}
					{'\n'}
					<Text className="text-sm italic" style={{ fontFamily: "Poppins_400Regular" }}>
						{report.name}
					</Text>
				</Text>
			</View>
			<View>
				<View style={styles.action}>
					<Button mode='contained' textColor='white' buttonColor='#1976D2' labelStyle={{ fontSize: 10, fontFamily: "Poppins_500Medium" }} onPress={showRunnow}>
						Run Now
					</Button>
					{/* <Button mode='contained' textColor='white' buttonColor='#1976D2' labelStyle={{ fontSize: 10, fontFamily: "Poppins_500Medium" }} onPress={showSchedule}>
						Schedule
					</Button> */}
				</View>
			</View>
			<Portal>
				<Dialog visible={runnowDlg} onDismiss={hideRunnow} className="rounded-3xl bg-white">
					<Dialog.Title className="text-center" style={{ fontFamily: "Poppins_600SemiBold", fontSize: 20 }}>{report.name}</Dialog.Title>
					<Dialog.Content className="gap-2 w-[100%]">
						{/* <Dropdown
							className="rounded-2xl p-4 border-2 border-[#606074] text-[#606074]"
							itemTextStyle={{ fontFamily: "Poppins_500Medium" }}
							placeholderStyle={{ fontFamily: "Poppins_500Medium" }}
							selectedTextStyle={{ fontFamily: "Poppins_500Medium" }}
							data={voicelist}
							labelField="label"
							valueField="value"
							placeholder="Audio"
							value={voice}
							onChange={item => setVoice(item.value)}
						/>
						<View>
							<SoundPlayer />
						</View> */}
						<Dropdown
							className="rounded-2xl p-4 border-2 border-[#606074] text-[#606074]"
							itemTextStyle={{ fontFamily: "Poppins_500Medium" }}
							placeholderStyle={{ fontFamily: "Poppins_500Medium" }}
							selectedTextStyle={{ fontFamily: "Poppins_500Medium" }}
							data={types}
							labelField="label"
							valueField="value"
							placeholder="Type"
							value={type}
							onChange={item => setType(item.value)}
						/>

						<View className="rounded-2xl p-4 border-2 border-[#606074]" style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
							<TextInput
								placeholder='Email'
								value={email}
								onChangeText={text => setEmail(text)}
								style={{ width: "80%", color: "#606074", fontFamily: "Poppins_500Medium" }}
							/>
							<IconButton
								icon="plus-circle"
								size={20}
								style={{ margin: -10 }}
								iconColor='#1976D2'
								onPress={() => {
									if (email.length == 0)
										return;
									if (emailList.includes(email))
										return;
									setEmailList([...emailList, email])
									setEmail("");
								}} />
						</View>
						<View style={{ flexDirection: "column", padding: 10 }}>
							{
								emailList.map(
									email => {
										return <View key={email} style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
											<Text>{email}</Text>
											<IconButton
												icon="trash-can"
												size={20}
												onPress={() => {
													setEmailList(emailList.filter(item => item != email));
												}}
											/>
										</View>
									}
								)
							}
						</View>
					</Dialog.Content>
					<Dialog.Actions style={{ justifyContent: "center" }}>
						<Button
							mode='contained'
							buttonColor='#1976D2'
							style={{ paddingHorizontal: 60, paddingVertical: 5 }}
							labelStyle={{ fontFamily: "Poppins_500Medium" }}
							onPress={handleRunReport}
							loading={isLoading}
							disabled={isLoading}
						>
							Run Report
						</Button>
					</Dialog.Actions>
				</Dialog>

				<Dialog visible={scheduleDlg} onDismiss={hideSchedule} className="rounded-3xl bg-white">
					<Dialog.Title className="text-center" style={{ fontFamily: "Poppins_600SemiBold", fontSize: 20 }}>{report.name}</Dialog.Title>
					<Dialog.Content className="gap-2">
						<Dropdown
							className="rounded-2xl p-4 border-2 border-[#606074] text-[#606074]"
							itemTextStyle={{ fontFamily: "Poppins_500Medium" }}
							placeholderStyle={{ fontFamily: "Poppins_500Medium" }}
							selectedTextStyle={{ fontFamily: "Poppins_500Medium" }}
							data={voicelist}
							labelField="label"
							valueField="value"
							placeholder="Audio"
							value={voice}
							onChange={item => setVoice(item.value)}
						/>

						<View>
							<SoundPlayer />
						</View>

						<View style={styles.checkboxlist}>
							{
								days.map((day, index) => {
									return <CheckBox
										key={day}
										onPress={() => {
											if (schedulelist.some(item => item == day))
												handleCheckbox(index)
										}}
										checked={scheduleState[index]}
										disabled={!schedulelist.some(item => item == day)}
										checkedIcon={<Text style={styles.checked}>{day}</Text>}
										uncheckedIcon={
											<Text
												style={
													schedulelist.some(item => item == day)
														?
														styles.unchecked
														:
														styles.disabled
												}>
												{day}
											</Text>}
									/>
								})
							}
						</View>
					</Dialog.Content>
					<Dialog.Actions style={{ justifyContent: "center" }}>
						<Button
							onPress={handleScheduleUpdate}
							mode='contained'
							buttonColor='#1976D2'
							style={{ paddingHorizontal: 60, paddingVertical: 5 }}
							labelStyle={{ fontFamily: "Poppins_500Medium" }}
						>
							Save
						</Button>
					</Dialog.Actions>
				</Dialog>

			</Portal>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	cell: {
		flex: 1,
		flexDirection: "column",
		marginVertical: 20
	},
	action: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20
	},
	checked: {
		borderColor: "#1976D2",
		borderRadius: 40,
		fontFamily: "Poppins_500Medium",
		paddingVertical: 10,
		borderWidth: 1,
		backgroundColor: "#1976D2",
		color: "white",
		width: 40,
		textAlign: "center",
		marginHorizontal: -30,
		fontSize: 10
	},
	unchecked: {
		borderColor: "#1976D2",
		borderRadius: 40,
		fontFamily: "Poppins_500Medium",
		paddingVertical: 10,
		borderWidth: 1,
		textAlign: "center",
		marginHorizontal: -30,
		width: 40,
		fontSize: 10
	},
	disabled: {
		borderColor: "#999999",
		color: "#999999",
		borderRadius: 40,
		fontFamily: "Poppins_500Medium",
		paddingVertical: 10,
		borderWidth: 1,
		textAlign: "center",
		marginHorizontal: -30,
		width: 40,
		fontSize: 10
	},
	checkboxlist: {
		gap: 5,
		flexDirection: "row",
		paddingLeft: 15
	},
})

export default ReportTableRow;