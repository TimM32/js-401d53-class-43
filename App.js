import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';


//   const call = (contact) => {
//     let phoneNumber = contact.phoneNumber?.[0]?.number;
    
    
//     const link = `tel:${phoneNumber}`
    
//     Linking.canOpenURL(link)
//     .then(supported => Linking.openURL(link))
//     .catch(error => console.error(error));
// }

const call = (contact) => {
  const phoneNumber = contact.phoneNumbers?.[0]?.number;
  if (phoneNumber) {
    // Removes non-numeric characters from the phone number if needed
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');

    const link = `tel:${formattedPhoneNumber}`;
    Linking.canOpenURL(link)
      .then(supported => {
        if (supported) {
          Linking.openURL(link);
        } else {
          console.error("Phone call not supported on this device.");
        }
      })
      .catch(err => console.error(err));
  } else {
    console.error("Contact does not have a valid phone number.");
  }
};


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
    const getContacts = async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        console.log('here is ->>>>>>>>>>>', status);
        if (status === 'granted') {
          let { data } = await Contacts.getContactsAsync();
          console.log('My data is here', data[0].name);
          setContacts(data);
        }
      } catch (error) {
        console.error('->>>>>>>>>>>>', error);
      }
    };
    
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



