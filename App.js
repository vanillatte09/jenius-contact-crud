import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ContactListPage from './Component/ContactListPage';
import ContactDetailPage from './Component/ContactDetailPage';
import ContactUpdatePage from './Component/ContactUpdatePage';
import ContactAddPage from './Component/ContactAddPage';

const MainNavigator = createStackNavigator({
  ContactList: {screen: ContactListPage},
  ContactDetail: {screen: ContactDetailPage},
  ContactUpdate: {screen: ContactUpdatePage},
  ContactAdd: {screen: ContactAddPage}
});

const App = createAppContainer(MainNavigator);

export default App;
