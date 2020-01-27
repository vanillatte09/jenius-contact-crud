import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';
import { API_URL } from '../Constants/Constants';

export default class UpdateContactPage extends React.Component {

  static navigationOptions = {
    title: 'Update Contact',
  };

  constructor(props) {
    super(props);
    this.state = {
      id: props.navigation.state.params.id,
      firstName: props.navigation.state.params.firstName,
      lastName: props.navigation.state.params.lastName,
      age: props.navigation.state.params.age,
      photo: props.navigation.state.params.photo
    }
  }
    
  handleSubmit = () => {
    const { navigation } = this.props;
    const { id, firstName, lastName, age, photo } = this.state;
    axios.put(API_URL + '/' + id, {
        firstName: firstName,
        lastName: lastName,
        age: age,
        photo: photo,
    })
    .then(function (response) {
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

  render() {
    return (
      <View style={{flex: 1, paddingTop:20, paddingHorizontal: 20}}>
        <TextInput 
          placeholder={this.props.navigation.state.params.firstName}
          onChangeText={(value) => this.setState({firstName: value})}
          style={styles.inputStyle}
        />
        <TextInput 
          placeholder={this.props.navigation.state.params.lastName}
          onChangeText={(value) => this.setState({lastName: value})}
          style={styles.inputStyle}
        />
        <TextInput 
          placeholder={this.props.navigation.state.params.age.toString()}
          keyboardType={"numeric"}
          onChangeText={(value) => this.setState({age: value})}
          style={styles.inputStyle}
        />
        <TextInput 
          placeholder={this.props.navigation.state.params.photo}
          onChangeText={(value) => this.setState({photo: value})}
          style={styles.inputStyle}
        />
        <TouchableOpacity
          style={styles.submitButtonStyle}
          activeOpacity = { .5 }
          onPress={ this.handleSubmit }
        >
            <Text style={styles.textStyle}> UPDATE </Text>
      </TouchableOpacity>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
    inputStyle : {
      height: 40, 
      borderColor: 'lightgrey', 
      borderWidth: 2, 
      marginVertical: 10, 
      paddingLeft: 10
    },
    submitButtonStyle: {
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
    textStyle:{
        color:'#fff',
        textAlign:'center',
    }
});