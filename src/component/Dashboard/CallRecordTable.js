import React from 'react'
import { Table, Checkbox } from 'semantic-ui-react'

const CallRecordTable = () => (
  <Table celled singleLine compact small inverted selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>BPD Call Id</Table.HeaderCell>
        <Table.HeaderCell>Call Time</Table.HeaderCell>
        <Table.HeaderCell>Priority</Table.HeaderCell>
        <Table.HeaderCell>District</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell>Address</Table.HeaderCell>
        <Table.HeaderCell>Latitude</Table.HeaderCell>
        <Table.HeaderCell>Longitude</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {
                    this.state.map((tableData) => (
                        <SampleComponent key={item.bpdCallId} name={item.name}/>
                    ))
                }
      <Table.Row>
        <Table.Cell collapsing>
            <Checkbox />
          </Table.Cell>
          <Table.Cell>John</Table.Cell>
          <Table.Cell>Approved</Table.Cell>
          <Table.Cell textAlign='center'>None</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default CallRecordTable
