import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { setTablesInfo } from './actions'
import uuid from 'uuid'

const types = [
  'Poker',
  'Bridge',
  'BlackJack',
  'Ruletka'
]

const randomInt = (to) => Math.floor(Math.random() * to)

const TableRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  animation: ${props => props.warning ? blinking + ' 1s linear infinite' : 'none'};
  animation-direction: alternate;
`

const TableHeaderRow = styled(TableRow)`
  background-color: gray;
`

const TableCell = styled.div`
  flex: ${props => props.flex};
`

const blinking = keyframes`
  from {
    background-color: white;
  }

  to {
    background-color: red;
  }
`

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tablesCount: 10
    }
  }

  componentDidMount() {
    this.generateTablesInfo()
    this.interval = setInterval(this.generateTablesInfo, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  generateTablesInfo = () => {
    const data = [];
    for (let i = 0; i < this.state.tablesCount; i++) {
      const table = {};
      table.id = uuid()
      table.type = types[randomInt(4)]
      table.name = `table #${randomInt(100)}`
      table.warning = Math.random() > 0.5
      table.maxPlayers = randomInt(12)
      table.players = randomInt(table.maxPlayers)

      data.push(table)
    }
    this.props.setTablesInfo(data)
  }

  render() {
    const { tables } = this.props

    return (
      <div>
        <TableHeaderRow>
          <TableCell flex={2}>IDs</TableCell>
          <TableCell flex={1}>Type</TableCell>
          <TableCell flex={1}>Name</TableCell>
          <TableCell flex={1}>Max Players</TableCell>
          <TableCell flex={1}>Players</TableCell>
        </TableHeaderRow>
        {tables.map(table => 
          <TableRow warning={table.warning}>
            <TableCell flex={2}>{table.id}</TableCell>
            <TableCell flex={1}>{table.type}</TableCell>
            <TableCell flex={1}>{table.name}</TableCell>
            <TableCell flex={1}>{table.maxPlayers}</TableCell>
            <TableCell flex={1}>{table.players}</TableCell>
          </TableRow>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({tables}) => ({tables})
const mapDispatchToProps = { setTablesInfo }

export default connect(mapStateToProps, mapDispatchToProps)(App);
