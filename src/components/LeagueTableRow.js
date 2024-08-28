import React, { useState } from 'react';
import { Button, DataTable, Dialog, Divider, Portal, TextInput } from 'react-native-paper';
import { Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';

const teams = [
    { label: 'team1', value: 'Team1' },
    { label: 'team2', value: 'Team2' },
    { label: 'team3', value: 'Team3' },
]

const weeks = [
    { label: 'week1', value: "Week1" },
    { label: 'week2', value: "Week2" },
    { label: 'week3', value: "Week3" },
]

const LeagueTableRow = () => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const [team, setTeam] = useState(null)
    const [week, setWeek] = useState(null)

    const [feedback, setFeedback] = useState('')

    const ReportPress = () => navigation.navigate("Report");

    return (
        <DataTable.Row className="h-20">
            <DataTable.Cell style={{ flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
                <Text className="text-center">
                    League of Thrones
                </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
                <Text className="text-center">
                    2024
                </Text>
            </DataTable.Cell>
            <DataTable.Cell onPress={ReportPress} style={{ flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
                <Text className="text-center text-blue-500">
                    Manage Reports
                </Text>
            </DataTable.Cell>
            <DataTable.Cell onPress={showDialog} style={{ flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
                <Text className="text-center text-blue-500">
                    Your SideLine Snippets
                </Text>
            </DataTable.Cell>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} className="rounded-md bg-white">
                    <Dialog.Title>Your Sideline Snippets</Dialog.Title>
                    <Dialog.Content className="gap-2">
                        <Dropdown
                            className="rounded-md p-2 border-2 border-slate-300"
                            data={teams}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Team"
                            value={team}
                            onChange={item => setTeam(item.value)}
                        />

                        <Dropdown
                            className="rounded-md p-2 border-2 border-slate-300"
                            data={weeks}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Week"
                            value={week}
                            onChange={item => setWeek(item.value)}
                        />

                        <TextInput
                            placeholder='Feedback'
                            multiline
                            value={feedback}
                            onChangeText={text => setFeedback(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button>Save</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </DataTable.Row>
    )
}

export default LeagueTableRow;