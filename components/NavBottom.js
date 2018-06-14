import React from 'react';
import Icon from './Icon';
import { View } from 'react-native';

const NavBottom = (props) => (
    <View style={{flexDirection: 'row', height: 80, backgroundColor: '#eaf9fc', alignItems: 'center', justifyContent:'center', padding: 20, borderTopColor: '#ffdddd', borderTopWidth: 2}}>
        <Icon img={require('../assets/warning.png')}  handlePageChange={props.changePageUrgent} />
        <Icon img={require('../assets/minus.png')}   handlePageChange={props.changePageBugs}/>
        <Icon img={require('../assets/checked.png')}  handlePageChange={props.changePageCompleted}/>
        <Icon img={require('../assets/push-pin.png')} handlePageChange={props.changePageAddBug}/>
    </View>
)

export default NavBottom;
