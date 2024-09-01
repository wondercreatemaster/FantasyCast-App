import { useState } from "react";
import { Button, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native";
import { DataTable, Dialog, Portal } from "react-native-paper";

const ReportLogTableRow = ({ reportlog }) => {
  const date = new Date(reportlog.run_date);

  const [open, setOpen] = useState(false);

  const showDialog = () => setOpen(true);

  const hideDialog = () => setOpen(false);

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
          <Dialog.Actions>
            <Button title="Close" onPress={hideDialog} />
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