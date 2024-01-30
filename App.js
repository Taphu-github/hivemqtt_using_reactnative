import Paho from "paho-mqtt";
import { useState, useEffect } from "react";
import { StyleSheet, Text, Button, View, Image, ScrollView} from 'react-native';


client = new Paho.Client(
  "cluster_url",//You can find this Getting started page of hivecloudmqtt
  Number(8884),//Websocket number, You can also find this there
  `mqtt-async-test-${parseInt(Math.random() * 100)}`//these is random
);

export default function App() {

  const [value, setValue] = useState("");
  
  
  function onMessage(message) {
    if (message.destinationName === "animal")
      setValue(message.payloadString);//setting the value of value variable as message.payloadString, I was able to use one setState only
      console.log(message.payloadString);

  }

  useEffect(() => {
    client.connect( {
      onSuccess: () => { 
      console.log("Connected!");
      client.subscribe("animal");//subscribe to the topic
      client.onMessageArrived = onMessage;//These will be evoked when you get message
    },
    onFailure: () => {
      console.log("Failed to connect!"); 
    },
    userName: 'username',//these you can craete in the accessmanagement tab
    password: 'password',//same
    useSSL: true
  });
  }, [])

  

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Hello</Text>
        <Image
          style={styles.image}
          source={{uri: `data:image/jpeg;base64,${value}`}}//my payload is in base64, and i am displaying it
        />
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    height: 100,//if you don't give proper height and width, The images doesn't show
    width: 100
  },
});
