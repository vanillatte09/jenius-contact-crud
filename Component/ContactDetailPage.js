import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation'
import Loader from './Loader';
import { API_URL } from '../Constants/Constants';

export default class ContactDetailPage extends React.Component {

  static navigationOptions = {
    title: 'Contact Detail',
  };

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      age: '',
      photo: 'N/A',
      loading: true
    }
  }

  componentDidMount(){
    this.fetchDetailData();
  }

  fetchDetailData() {
    const { navigation: { state: { params: { id } } } } = this.props;
    axios.get(API_URL + '/' + id)
    .then(response => {
      this.setState({
        id: response.data.data.id,
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        age: response.data.data.age,
        photo: response.data.data.photo,
        loading: false
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  navigateToUpdate = () => {
    const { firstName, lastName, age, photo, id } = this.state;
    const {navigate} = this.props.navigation;
    navigate('ContactUpdate', {
      id: id,
      firstName: firstName,
      lastName: lastName,
      age: age,
      photo: photo
    })
  }

  deleteContact = (id) => {
    axios.delete(API_URL + '/' + id)
    .then(response => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'ContactList' })],
      });
      navigation.dispatch(resetAction);  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  showAlertConfirmation = () => {
    Alert.alert(
        `Delete ${this.state.firstName}?`,
        `This will be delete ${this.state.firstName} & cannot be undone`,
        [
            {text: 'OK', onPress: () => this.deleteContact(this.state.id)},
            {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
  }

  renderMenuItems = () => (
      <View style={{ alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.updateButtonStyle}
          activeOpacity = { .5 }
          onPress={ this.navigateToUpdate }
        >
          <Text style={styles.textStyle}> UPDATE </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButtonStyle}
          activeOpacity = { .5 }
          onPress={this.showAlertConfirmation }
        >
          <Text style={styles.textStyle}> DELETE </Text>
        </TouchableOpacity>
      </View>
  );

  render() {
    const { firstName, lastName, age, photo, id, loading } = this.state;
    return (
      (!loading) ? (<View style={{flex: 1, padding:40}}>
        <Image
          style={{width: 100, height: 100, alignSelf: 'center'}}
          source={{uri: photo}}
          defaultSource={require('../assets/jenius_icon.png')}
        />
        <Text style={{marginTop:15, alignSelf: 'center'}}>{firstName} {lastName}</Text>
        <Text style={{marginBottom:15, alignSelf: 'center'}}>{age} years old</Text>
        {this.renderMenuItems()}
      </View>) : <Loader />
    );
  }
}

const styles = StyleSheet.create({
    updateButtonStyle: {
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#00BCD4',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },  
    deleteButtonStyle: {
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#FF0000',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },     
    textStyle:{
        color:'#fff',
        textAlign:'center',
    }
});