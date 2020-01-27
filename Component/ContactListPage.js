import React from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Loader from './Loader';
import { API_URL } from '../Constants/Constants';

export default class ContactListPage extends React.Component {

    static navigationOptions = {
        title: 'Contact List'
    }

    constructor(props) {
        super(props);
        this.state = {
            contactList: [],
            loading: true
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios.get(API_URL)
        .then(response => {
          this.setState({
            contactList: response.data.data,
            loading: false
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }

    renderViewItem = (item) => (
      <TouchableOpacity onPress={() => this.navigateToDetail(item.id)}>
        <View style={{flex: 1, padding:20, flexDirection: 'row'}}>
          <Image
            style={{width: 50, height: 50, marginRight: 15}}
            source={{ uri: item.photo }}
            defaultSource={require('../assets/jenius_icon.png')}
          />
          <View>
            <Text>{item.firstName} {item.lastName}</Text>
            <Text>{item.age} years old</Text>
          </View>
         </View>
       </TouchableOpacity>
    );

    navigateToDetail(contactId) {
      const {navigate} = this.props.navigation;
      navigate('ContactDetail', {id: contactId})
    }
      
    addContact = () => {
      const {navigate} = this.props.navigation;
      navigate('ContactAdd', {refetch: this.fetchData})
    }

    renderFAB = () => (
      <TouchableOpacity onPress={() => this.addContact()} style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    );

    render() {
      return (
        (!this.state.loading) ? (<View style={{flex: 1, paddingTop:20}}>
          <FlatList
            data={this.state.contactList}
            renderItem={({item}) => this.renderViewItem(item)}
            keyExtractor={({item}, index) => index.toString()}
          />
          {this.renderFAB()}
        </View>) : <Loader />
      )
    }
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#03A9F4',
        borderRadius: 28,
        elevation: 8
      },
      fabIcon: {
        fontSize: 40,
        color: 'white'
      }
})