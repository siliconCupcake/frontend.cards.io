import React from 'react'
import {Tab, Tabs} from 'react-bootstrap'

export const Suits = ({suit, setSuit, classes}) => {
    return (
        <Tabs
            defaultActiveKey={suit}
            className={classes.tabs}
            onSelect={(k) => setSuit(k)}
        >
            <Tab eventKey={0} title="Lower"></Tab>
            <Tab eventKey={1} title="Higher"></Tab>
        </Tabs>
    )
}
