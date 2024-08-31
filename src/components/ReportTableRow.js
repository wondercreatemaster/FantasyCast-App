import React, { useEffect, useState } from 'react';
import { Button, DataTable, Dialog, Divider, Portal, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "react-native-vector-icons"
import SoundPlayer from './SoundPlayer';
import { CheckBox } from '@rneui/base';
import fetchWithToken from '../utils/fetchWithToken';


const types = [
    { label: 'type1', value: "Type1" },
    { label: 'type2', value: "Type2" },
    { label: 'type3', value: "Type3" },
]

const ReportTableRow = ({ report }) => {
    const navigation = useNavigation();

    const [voices, setVoices] = useState([]);
    const [voicelist, setVoicelist] = useState([]);
    const [voice, setVoice] = useState(null)

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

    const [type, setType] = useState(null)

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
                            <CheckBox
                                disabled
                                checkedIcon={<Text style={styles.checked}>Sun</Text>}
                                uncheckedIcon={<Text style={styles.unchecked}>Sun</Text>}
                            />
                            <CheckBox
                                checkedIcon={<Text style={styles.checked}>Mon</Text>}
                                uncheckedIcon={<Text style={styles.unchecked}>Mon</Text>}
                            />
                            <CheckBox
                                disabled
                                checkedIcon={<Text style={styles.checked}>Tue</Text>}
                                uncheckedIcon={<Text style={styles.unchecked}>Tue</Text>}
                            />
                            <CheckBox
                                disabled
                                checkedIcon={<Text style={styles.checked}>Wed</Text>}
                                uncheckedIcon={<Text style={styles.unchecked}>Wed</Text>}
                            />
                            <CheckBox
                                disabled
                                checkedIcon={<Text style={styles.checked}>Thu</Text>}
                                uncheckedIcon={<Text style={styles.unchecked}>Thu</Text>}
                            />
                            <CheckBox
                                disabled
                                checkedIcon={<Text style={styles.checked}>Fri</Text>}
                                uncheckedIcon={<Text style={styles.unchecked}>Fri</Text>}
                            />
                            <CheckBox
                                disabled
                                checkedIcon={<Text style={styles.checked}>Sat</Text>}
                                uncheckedIcon={<Text style={styles.unchecked}>Sat</Text>}
                            />
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