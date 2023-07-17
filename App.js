import { StatusBar } from 'expo-status-bar';
import { Button, Linking, StyleSheet, Text, View } from 'react-native';
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
  const [contacts, setContacts] = useState([])

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
      <Text>Open up App.js to start working on your app!</Text>
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
  },
});
