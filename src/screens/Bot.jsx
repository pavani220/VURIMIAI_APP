import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Make sure to install react-native-vector-icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure to install react-native-vector-icons


const responses = {
  hi: 'Hello, Welcome to VurimiAi Global Services, how can I help you today?',
  issue: 'Sorry for the inconvenience, please call the customer care number.',
  problem: 'Sorry for the inconvenience, please call the customer care number.',
  complaint: 'Sorry for the inconvenience, please call the customer care number.',
  help: 'Sorry for the inconvenience, please call the customer care number.',
  location: 'VurimiAi Main Branch is located in Nellore, Andhra Pradesh, India.',
  address: 'VurimiAi Main Branch is located in Nellore, Andhra Pradesh, India.',
  situated: 'VurimiAi Main Branch is located in Nellore, Andhra Pradesh, India.',
  less: 'We cant provide service for less than 5 hectare land for far locations. For support please contact customer care.',
  drone: 'Our drones are equipped for efficient spraying. What would you like to know?',
  spraying: 'We offer various spraying services, including pesticides and fertilizers. Can I help you with something specific?',
  cost: 'The cost of our drone spraying services varies based on the area and type of service. Please provide more details for a quote.',
  default: 'I am sorry, I do not understand your question. Can you please rephrase?'
};

const Bot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const generateUniqueId = () => `${Date.now().toString()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { id: generateUniqueId(), text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      respondToUser(input);
    }
  };

  const respondToUser = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    let botResponse = responses.default;

    for (const key in responses) {
      if (lowerInput.includes(key)) {
        botResponse = responses[key];
        break;
      }
    }

    const botMessage = { id: generateUniqueId(), text: botResponse, sender: 'bot' };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/vurimi_ai.png')} style={styles.backgroundImage} />
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={item.sender === 'user' ? styles.userMessage : styles.botMessageContainer} >
            {item.sender === 'bot' && (
              <View style={styles.botIconContainer}>
                <MaterialCommunityIcons name="robot-outline" size={24} color="#000" style={styles.botIcon} />
              </View>
            )}
            <View style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
              <Text style={styles.messageText}>{item.text}</Text>
              
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Bot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10, // Added border radius
  },
  backgroundImage: {
    position: 'absolute',
    width: 380, // Slightly increased width
    height: 300, // Slightly increased height
    opacity: 0.5, // Slightly increased opacity
    alignSelf: 'center',
    top: '30%',
  },
  messageList: {
    flex: 1,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
    borderRadius: 20, // Increased border radius
    paddingHorizontal:10,
    paddingVertical:2,
    marginVertical: 5,
    maxWidth: '80%',
    fontFamily:'Poppins-Regular',

  },
  botMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  botIconContainer: {
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: '#f8d7da',
    padding: 5,
  },
  botIcon: {
    borderRadius: 12,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8d7da',
    borderRadius: 28, // Increased border radius
    maxWidth: '80%',
    paddingVertical:7,
    paddingHorizontal:20,
    fontFamily:'Poppins-Regular',

  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10, // Added border radius
    borderColor: '#ccc',
    padding: 5,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20, // Added border radius
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
  },
});
