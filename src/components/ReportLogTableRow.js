import { Button, Icon } from "@rneui/themed";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native";
import { DataTable, Dialog, Portal } from "react-native-paper";
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
    <DataTable.Row onPress={showDialog}>
      <DataTable.Cell>
        <Text>{reportlog.report_name}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text>
          {date.getFullYear()}-{String(date.getMonth() + 1).padStart(2, '0')}-{String(date.getDate()).padStart(2, '0')} {String(date.getHours()).padStart(2, '0')}:{String(date.getMinutes()).padStart(2, '0')}
        </Text>
      </DataTable.Cell>
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
    </DataTable.Row>
  )
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: "center"
  }
})


export default ReportLogTableRow;