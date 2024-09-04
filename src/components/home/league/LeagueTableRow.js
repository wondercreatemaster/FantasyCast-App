import React, { useEffect, useMemo, useState } from 'react';
import { Button, DataTable, Dialog, Divider, Portal } from 'react-native-paper';
import { Alert, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import fetchWithToken from '../../../utils/fetchWithToken';

const LeagueTableRow = ({ league }) => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);

    const [nowWeek, setNowWeek] = useState(1)
    const weeks = useMemo(() => {
        const save = [];
        for (let i = 1; i <= nowWeek; i++) {
            save.push({ label: i.toString(), value: i.toString() });
        }
        return save;
    }, [nowWeek]);


    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const [team, setTeam] = useState(null)
    const [week, setWeek] = useState(null)

    const [comment, setComment] = useState('')

    const [feedback, setFeedback] = useState({});

    const [feedbacks, setFeedbacks] = useState([]);
    const [teams, setTeams] = useState([]);

    const ReportPress = () => navigation.navigate("Report", { league });

    const fetchFeedback = async () => {
        const response = await fetchWithToken(
            `https://fantasycastcentral.com/api/user/feedback/list?league=${league.league_id}`,
            {
                method: "GET"
            }
        );
        const data = await response.json();
        return data.data;
    }

    const fetchTeam = async () => {
        const response = await fetchWithToken(
            'https://fantasycastcentral.com/api/user/report/team/list',
            {
                method: "POST",
                body: JSON.stringify({ league: league.league_id })
            }
        );
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        (async () => {
            const teamData = await fetchTeam();
            let teamList = Object.entries(teamData.list);

            const feedbackData = await fetchFeedback();
            setFeedbacks(feedbackData);
            setNowWeek(teamData.week);
            setTeams(teamList.map(item => {
                return { value: item[0], label: item[1] }
            }))
        })()
    }, [])

    useEffect(() => {
        let selectedTeam = teams.filter(item => item.value == team)[0];
        let result = feedbacks?.filter(item => item.league_id === league.league_id && item.week == week && selectedTeam?.label == item.target_team)[0];

        if (result && result.comment)
            setComment(result.comment)
        else setComment("")

        setFeedback(result)
    }, [team, week])

    handleFeedback = async () => {
        const response = await fetchWithToken(
            "https://fantasycastcentral.com/api/user/feedback/update",
            {
                method: "POST",
                body: JSON.stringify({
                    id: feedback?._id,
                    league: league.league_id,
                    week: week,
                    target_team: team,
                    comment
                })
            }
        )

        const result = await response.json();
        setFeedback(result.data);

        const feedbackExist = feedbacks.some(item => item._id === result.data._id);
        if (feedbackExist) {
            setFeedbacks(prev => prev?.map(feed => feed._id === result.data._id ? result.data : feed))
        }
        else {
            setFeedbacks(prev => [...prev, result.data])
        }
    }

    return (
        <View style={{ borderBottomWidth: 1.3, borderColor: "#2E2F3E" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 20 }}>
                <Text className="text-center text-white" style={{ fontFamily: "Poppins_500Medium" }}>
                    {league.name}
                </Text>
                <Text className="text-center text-white" style={{ fontFamily: "Poppins_500Medium" }}>
                    {league.season}
                </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                <Button onPress={ReportPress} mode='contained' buttonColor='#1976D2' labelStyle={{ fontSize: 12, fontFamily: "Poppins_500Medium" }}>
                    Manage Reports
                </Button>
                <Button onPress={showDialog} mode='contained' buttonColor='#1976D2' labelStyle={{ fontSize: 12, fontFamily: "Poppins_500Medium" }}>
                    SideLine Snippets
                </Button>
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} className="rounded-3xl bg-white">
                    <Dialog.Title style={{ textAlign: "center", fontFamily: "Poppins_600SemiBold" }}>Your Sideline Snippets</Dialog.Title>
                    <Dialog.Content className="gap-2">
                        <Dropdown
                            className="rounded-2xl p-4 border-2 border-[#606074] text-[#606074]"
                            itemTextStyle={{ fontFamily: "Poppins_500Medium" }}
                            selectedTextStyle={{ fontFamily: "Poppins_500Medium" }}
                            placeholderStyle={{ fontFamily: "Poppins_500Medium" }}
                            data={teams}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Team"
                            value={team}
                            onChange={item => setTeam(item.value)}
                        />

                        <Dropdown
                            className="rounded-2xl p-4 border-2 border-[#606074] text-[#606074]"
                            itemTextStyle={{ fontFamily: "Poppins_500Medium" }}
                            selectedTextStyle={{ fontFamily: "Poppins_500Medium" }}
                            placeholderStyle={{ fontFamily: "Poppins_500Medium" }}
                            data={weeks}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Week"
                            value={week}
                            onChange={item => setWeek(item.value)}
                        />

                        <TextInput
                            placeholder='Feedback'
                            className="rounded-2xl p-4 border-2 border-[#606074] text-[#606074]"
                            style={{ fontFamily: "Poppins_500Medium" }}
                            multiline
                            numberOfLines={5}
                            textAlignVertical='top'
                            value={comment}
                            onChangeText={text => setComment(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions style={{ justifyContent: "center" }}>
                        <Button
                            onPress={handleFeedback}
                            mode='contained'
                            buttonColor='#1976D2'
                            style={{ paddingHorizontal: 70, paddingVertical: 5 }}
                            labelStyle={{ fontFamily: "Poppins_500Medium" }}
                        >
                            Save
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

export default LeagueTableRow;