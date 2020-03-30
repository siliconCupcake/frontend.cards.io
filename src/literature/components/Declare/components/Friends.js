import React from 'react'
import {Tab, Tabs} from 'react-bootstrap'

export const Friends = ({setselectedFriend, selectedFriend, classes, friends}) => {
    return (
        <Tabs
            defaultActiveKey={selectedFriend}
            className={classes.tabs}
            onSelect={(k) => setselectedFriend(k)}
        >
            {friends.map((friend) => (
                <Tab eventKey={friend.position} title={friend.name}></Tab>
            ))}
        </Tabs>
    )
}
