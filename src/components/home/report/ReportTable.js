import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ReportTableRow from './ReportTableRow';

const ReportTable = ({ reports, scheduledata, league, setScheduleData }) => {
	const { report_schedule } = scheduledata;
	return (
		<View style={{ maxHeight: "88%" }}>
			<Text style={styles.header}>Report Name</Text>
			<ScrollView>
				<View style={styles.list}>
					{
						report_schedule != undefined && reports.map(report =>
							<ReportTableRow
								key={report._id}
								report={report}
								league={league}
								scheduled={report_schedule[report._id]}
								setScheduleData={setScheduleData}
							/>
						)
					}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		color: "white",
		marginTop: 20,
		padding: 10,
		fontFamily: "Poppins_400Regular"
	},
	list: {
		backgroundColor: "#252536",
		borderRadius: 20,
		paddingHorizontal: 20,
	}
});

export default ReportTable;