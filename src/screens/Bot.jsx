import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const Bot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { id: Date.now().toString(), text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      respondToUser (input);
    }
  };

  const respondToUser  = (userInput) => {
    let botResponse = '';

    // Simple keyword-based responses
    if (userInput.toLowerCase().includes('hi'))  {
      botResponse = 'Hello, Welcome to VurimiAi Global Services,how can I help you today?';
    }
    else if (userInput.toLowerCase().includes('issue')|| userInput.toLowerCase().includes('problem')|| userInput.toLowerCase().includes('complaint') || userInput.toLowerCase().includes('help')) {
        botResponse='Sorry for the inconvinience, please call to the customer care number';
    }
    else if (userInput.toLowerCase().includes('Location of vurimi')|| userInput.toLowerCase().includes('Where VurimiAi located')|| userInput.toLowerCase().includes('Address of Vurimi') || userInput.toLowerCase().includes('VurimiAi situated in')) {
        botResponse='VurimiAi is Main Branch is located in Nellore ,AndhraPradesh, India';
    }
    else if (userInput.toLowerCase().includes('less than 5 acre')|| userInput.toLowerCase().includes('No location found')|| userInput.toLowerCase().includes('Less land')) {

        botResponse='We cant able to provide service for less than 5 hectare land For Far locations.For support please contact customer care';
    }
    else if (userInput.toLowerCase().includes('drone')) {
      botResponse = 'Our drones are equipped for efficient spraying. What would you like to know?';
    } else if (userInput.toLowerCase().includes('spraying')) {
      botResponse = 'We offer various spraying services, including pesticides and fertilizers. Can I help you with something specific?';
    } else if (userInput.toLowerCase().includes('cost')) {
      botResponse = 'The cost of our drone spraying services varies based on the area and type of service. Please provide more details for a quote.';
    } else {
      botResponse = 'I am sorry, I do not understand your question. Can you please rephrase?';
    }

    const botMessage = { id: Date.now().toString(), text: botResponse, sender: 'bot' };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <Text style={styles.messageText}>{item.text}</Text>
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
        <Button title="Send" onPress={handleSend} />
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
  },
  messageList: {
    flex: 1,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8d7da',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});
