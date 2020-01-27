import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { API_URL, DEFAULT_PHOTO } from '../Constants/Constants';

export default class ContactAddPage extends React.Component {

  static navigationOptions = {
    title: 'Add New Contact',
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      age: 0,
      photo: ''
    }
  }
    
  handleSubmit = () => {
    const { navigation } = this.props;

    axios.post(API_URL, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        age: this.state.age,
        photo: this.state.photo || DEFAULT_PHOTO
    })
    .then(function (response) {
      const refetch = navigation.state.params.refetch;
      if(typeof refetch === 'function') {
        refetch(); 
        navigation.pop();
      }
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
          placeholder='First Name'
          onChangeText={(value) => this.setState({firstName: value})}
          style={styles.inputStyle}
        />
        <TextInput 
          placeholder='Last Name'
          onChangeText={(value) => this.setState({lastName: value})}
          style={styles.inputStyle}
        />
        <TextInput 
          placeholder='Age'
          keyboardType={"numeric"}
          onChangeText={(value) => this.setState({age: value})}
          style={styles.inputStyle}
        />
        <TextInput 
          placeholder='Photo URL'
          onChangeText={(value) => this.setState({photo: value})}
          style={styles.inputStyle}
        />
        <TouchableOpacity
          style={styles.submitButtonStyle}
          activeOpacity = { .5 }
          onPress={ this.handleSubmit }
        >
            <Text style={styles.textStyle}> SAVE </Text>
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