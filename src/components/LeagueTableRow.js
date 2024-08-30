import React, { useEffect, useMemo, useState } from 'react';
import { Button, DataTable, Dialog, Divider, Portal, TextInput } from 'react-native-paper';
import { Alert, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import fetchWithToken from '../utils/fetchWithToken';

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

    const ReportPress = () => navigation.navigate("Report");

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
        <DataTable.Row className="h-20">
            <DataTable.Cell style={{ flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
                <Text className="text-center">
                    {league.name}
                </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
                <Text className="text-center">
                    {league.season}
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
                            value={comment}
                            onChangeText={text => setComment(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={handleFeedback}>Save</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </DataTable.Row>
    )
}

export default LeagueTableRow;