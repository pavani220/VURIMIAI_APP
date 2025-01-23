import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import Header from '../components/Header';
import Services from '../components/Services';
import Reviews from '../components/Reviews';

const HomeScreen = () => {
  const data = [
    { key: 'header', component: <Header /> },
    { key: 'services', component: <Services /> },
    { key: 'reviews', component: <Reviews/> },

  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
  data={data}
  renderItem={({ item }) => item.component}
  keyExtractor={(item) => item.key}
  showsVerticalScrollIndicator={false}
  decelerationRate="normal" // or "fast", "slow"
  snapToAlignment="start"
/>
    </SafeAreaView>
  );
};

export default HomeScreen;
