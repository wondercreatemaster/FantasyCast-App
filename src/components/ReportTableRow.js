import React, { useEffect, useState } from 'react';
import { Button, DataTable, Dialog, Divider, Portal, TextInput } from 'react-native-paper';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "react-native-vector-icons"
import SoundPlayer from './SoundPlayer';
import { CheckBox } from '@rneui/themed';
import fetchWithToken from '../utils/fetchWithToken';


const types = [
    { label: 'Text', value: "1" },
    { label: 'Text & Audio', value: "2" },
]

const days = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
]

const ReportTableRow = ({ report, scheduled }) => {
    const navigation = useNavigation();

    const [voices, setVoices] = useState([]);
    const [voicelist, setVoicelist] = useState([]);
    const [voice, setVoice] = useState(null)

    const [schedulelist, setSchedulelist] = useState(report.schedule_list);

    const [scheduleState, setScheduleState] = useState(
        Array(7).fill(false)
    )

    const handleCheckbox = (index) => {
        Alert.alert(index);
        // let save = scheduleState;
        // save[index] = !save[index];
        // setScheduleState([...save]);
    }

    useEffect(() => {
        if (scheduled != undefined)
            setScheduleState(
                Array(7)
                    .fill(false)
                    .map(
                        (_, index) => scheduled.some(item => item == index))
            );
    }, [scheduled])

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

    const [runnowDlg, setRunnowDlg] = useState(false);
    const [scheduleDlg, setScheduleDlg] = useState(false);

    const showRunnow = () => setRunnowDlg(true);

    const hideRunnow = () => setRunnowDlg(false);

    const showSchedule = () => setScheduleDlg(true);

    const hideSchedule = () => setScheduleDlg(false);

    const [type, setType] = useState('1')

    const [email, setEmail] = useState('')

    return (
        <DataTable.Row className="h-[150] gap-2">
            <DataTable.Cell style={styles.cell}>
                <Text className="text-center text-base">
                    {report.description}
                    {'\n'}
                    <Text className="text-sm">
                        {report.name}
                    </Text>
                </Text>
            </DataTable.Cell>
            <DataTable.Cell>
                <View style={styles.action}>
                    <Button className="text-center text-blue-500" onPress={showRunnow}>
                        Run Now
                    </Button>
                    <Button className="text-center text-blue-500" onPress={showSchedule}>
                        Schedule
                    </Button>
                </View>
            </DataTable.Cell>
            <Portal>
                <Dialog visible={runnowDlg} onDismiss={hideRunnow} className="rounded-md bg-white">
                    <Dialog.Title>{report.name}</Dialog.Title>
                    <Dialog.Content className="gap-2">
                        <Dropdown
                            className="rounded-md p-2 border-2 border-slate-300"
                            data={voicelist}
                            labelField="label"
                            valueField="value"
                            placeholder="Audio"
                            value={voice}
                            onChange={item => setVoicelist(item.value)}
                        />

                        <SoundPlayer />

                        <Dropdown
                            className="rounded-md p-2 border-2 border-slate-300"
                            data={types}
                            labelField="label"
                            valueField="value"
                            placeholder="Type"
                            value={type}
                            onChange={item => setType(item.value)}
                        />

                        <View style={{ height: 50, alignItems: "center", flexDirection: "row", gap: 15 }}>
                            <TextInput
                                placeholder='Email'
                                value={email}
                                onChangeText={text => setEmail(text)}
                                style={{ width: "80%" }}
                            />
                            <AntDesign name="plus" size={20} color="#e75480" />
                        </View>

                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button>Save</Button>
                    </Dialog.Actions>
                </Dialog>

                <Dialog visible={scheduleDlg} onDismiss={hideSchedule} className="rounded-md bg-white">
                    <Dialog.Title>{report.name}</Dialog.Title>
                    <Dialog.Content className="gap-2">
                        <Dropdown
                            className="rounded-md p-2 border-2 border-slate-300"
                            data={voicelist}
                            labelField="label"
                            valueField="value"
                            placeholder="Audio"
                            value={voice}
                            onChange={item => setVoice(item.value)}
                        />

                        <SoundPlayer />
                        <View style={styles.checkboxlist}>
                            {
                                days.map((day, index) => {
                                    return <CheckBox
                                        key={day}
                                        onPress={() => handleCheckbox(index)}
                                        checked={scheduleState[index]}
                                        disabled={schedulelist.some(item => item == day)}
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
                    <Dialog.Actions>
                        <Button>Save</Button>
                    </Dialog.Actions>
                </Dialog>

            </Portal>
        </DataTable.Row>
    )
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center"
    },
    action: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center"
    },
    checked: {
        borderColor: "#2222ff",
        borderRadius: 50,
        paddingVertical: 10,
        borderWidth: 1,
        backgroundColor: "#2222ff",
        color: "white",
        width: 40,
        textAlign: "center",
        fontSize: 10
    },
    unchecked: {
        borderColor: "#2222ff",
        borderRadius: 50,
        paddingVertical: 10,
        borderWidth: 1,
        textAlign: "center",
        width: 40,
        fontSize: 10
    },
    disabled: {
        borderColor: "#999999",
        color: "#999999",
        borderRadius: 50,
        paddingVertical: 10,
        borderWidth: 1,
        textAlign: "center",
        width: 40,
        fontSize: 10
    },
    checkboxlist: {
        flex: 0,
        width: 40,
        gap: 10,
        flexDirection: "row",
    },
})

export default ReportTableRow;