import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';


  const call = (contact) => {
    let phoneNumber = contact.phoneNumber[0].number;
    const link = `tel:${phoneNumber}`
    
    /* The code `Linking.canOpenURL(link)` checks if the device is capable of opening the specified URL.
    It returns a promise that resolves to a boolean value indicating whether the URL can be opened or
    not. */
  Linking.canOpenURL(link)
    .then(supported => Linking.openURL(link))
    .catch(error => console.error(error));
}

const Item = ({ item }) => (
  <View style={styles.item}>
    <Button
      onPress={() => call(item)}
      title={item.name}
      />
  </View>
);

export default App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async() => {
      const { status } = await Contacts.requestPermissionAsync();
      if (status === 'granted'){
        const { data } = await Contacts.getContactsAsync();
          console.log('My data is here', data[0].name);
          setContacts(data)
      }
    }
    getContacts();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Contact List!</Text>
      <FlatList
        data={contacts}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },

  item: {
    backgroundColor: '#410d53',
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 12,
  },

  title: {
    color: '#fff',
    fontSize: 34,
  },

});
