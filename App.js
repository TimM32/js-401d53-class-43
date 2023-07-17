import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';

const call = (contact) => {
  let phoneNumber = contact.phoneNumber[0].number;
  const link = `tel:${phoneNumber}`

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

export default function App() {
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
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  
  title: {
    color: 'blue'
    fontSize: 34,
  },

});
