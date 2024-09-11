import { Icon } from "@rneui/themed";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import * as FileSystem from 'expo-file-system'

const ReportLogTableRow = ({ reportlog }) => {
  const date = new Date(reportlog.run_date);

  const [open, setOpen] = useState(false);

  const showDialog = () => setOpen(true);

  const hideDialog = () => setOpen(false);

  const handleDownloadContent = async () => {

    const fileUri = FileSystem.documentDirectory + 'download.txt';

    try {
      // Write the content to a text file
      await FileSystem.writeAsStringAsync(fileUri, reportlog.content, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      Alert.alert('Success', "Successfully Downloaded \n" + fileUri, [{ text: 'OK' }]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to download file.', [{ text: 'OK' }]);
    }
  }

  return (
    <View style={{ borderBottomWidth: 1.3, borderColor: "#2E2F3E" }}>
      <View style={{ marginVertical: 20 }}>
        <Text className="text-white" style={{ fontFamily: "Poppins_500Medium" }}>
          {reportlog.report_name}
        </Text>
        <Text className="text-[#606074]" style={{ fontFamily: "Poppins_400Regular" }}>
          {date.getFullYear()}-{String(date.getMonth() + 1).padStart(2, '0')}-{String(date.getDate()).padStart(2, '0')} {String(date.getHours()).padStart(2, '0')}:{String(date.getMinutes()).padStart(2, '0')}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <Button onPress={showDialog} mode='contained' buttonColor='#1976D2' labelStyle={{ fontSize: 10, fontFamily: "Poppins_500Medium" }}>
          Last Report
        </Button>
        <Button onPress={handleDownloadContent} mode='contained' buttonColor='#1976D2' labelStyle={{ fontSize: 10, fontFamily: "Poppins_500Medium" }}>
          Text
        </Button>
        <Button mode='contained' buttonColor='#1976D2' labelStyle={{ fontSize: 10, fontFamily: "Poppins_500Medium" }}>
          Audio
        </Button>
      </View>
      <Portal>
        <Dialog visible={open} onDismiss={hideDialog} className="rounded-md bg-white">
          <Dialog.Content className="max-h-[90%]">
            <ScrollView>
              <Text>
                {reportlog.content}
              </Text>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions style={{ gap: 20 }}>
            {
              reportlog.is_file && (
                <Button radius='sm'>
                  <Icon name="cloud-download" color="white" />
                </Button>
              )
            }
            <Button radius='sm' onPress={handleDownloadContent}>
              <Icon name="download" color="white" />
            </Button>
            <Button radius='sm' onPress={hideDialog}>
              Close
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

export default ReportLogTableRow;