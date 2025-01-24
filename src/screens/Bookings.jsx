import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Bookings = () => {
  const [bookedDays, setBookedDays] = useState({}); // Tracks which days are booked

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Disable past days by checking if the date is before today
  const disablePastDays = (dateString) => {
    return dateString < today;
  };

  const handleDayPress = (day) => {
    const { dateString } = day;

    // Check if the day is before today or already booked
    if (disablePastDays(dateString)) {
      Alert.alert('Invalid Date', `You cannot book a slot for ${dateString}. Please select a future date.`);
    } else if (bookedDays[dateString]) {
      Alert.alert(
        'Already Booked',
        `Slot for ${dateString} is already booked. Please select another day.`
      );
    } else {
      // Book the day
      setBookedDays({
        ...bookedDays,
        [dateString]: { selected: true, selectedColor: '#FF5252' },
      });
      Alert.alert('Booking Confirmed', `You have booked Slot 1 for ${dateString}.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select a Day to Book Drone Spraying</Text>

      {/* Calendar */}
      <Calendar
        style={styles.cal}
        onDayPress={handleDayPress}
        markedDates={{
          ...bookedDays, // Highlight booked days
          // Disable all past days
          ...Object.keys(bookedDays).reduce((acc, dateString) => {
            if (disablePastDays(dateString)) {
              acc[dateString] = { disabled: true, selectedColor: 'transparent' }; // Transparent background for blocked days
            }
            return acc;
          }, {}),
        }}
        theme={{
          selectedDayBackgroundColor: '#FF5252', // Red for selected days
          todayTextColor: '#4CAF50', // Green for today's date
          arrowColor: '#4CAF50',
          dayTextColor: '#333',
          textDayFontFamily: 'Arial',
          textMonthFontWeight: 'bold',
        }}
        renderHeader={(date) => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{date.toString().substring(4, 7)} {date.getFullYear()}</Text>
          </View>
        )}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Selected dates are marked as booked slots. Past dates are disabled.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Want to book the slot')}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#333',
    textAlign: 'center',
  },
  cal: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4, // Adds shadow for Android
  },
  header: {
    backgroundColor: '#2C3E50', // Dark blue background for the year header
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#FF5252',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Bookings;
