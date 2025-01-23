import React, { useState, useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuIcon from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get("window");

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const HomeScreenData = [
    {
      id: "01",
      image: require('../assets/images/slider_Img1.jpg'),
    },
    {
      id: "02",
      image: require("../assets/images/slider_Img2.jpg"),
    },
    {
      id: "03",
      image: require("../assets/images/slider_Img3.jpg"),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % HomeScreenData.length);
    }, 5000);

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index: activeIndex });
    }

    return () => clearInterval(interval);
  }, [activeIndex]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  };

  const renderLines = () => {
    return (
      <View style={styles.linesContainer}>
        {HomeScreenData.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.line, activeIndex === index ? styles.activeLine : null]}
            onPress={() => setActiveIndex(index)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MenuIcon name="menu" size={30} color="black" style={styles.icon} />
        <Text style={styles.headerText}>Vurimi AI</Text>
        <Icon name="bell" size={30} color="black" style={styles.icon} />
      </View>

      <View style={styles.sliderContainer}>
        <FlatList
          ref={flatListRef}
          data={HomeScreenData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.slider}
          extraData={activeIndex}
          initialScrollIndex={activeIndex}
        />

        {renderLines()}
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width * 1,
    paddingHorizontal: 15,
    marginTop: 5,
    paddingBottom: 5, // Decreased padding-bottom to reduce height
  },
  headerText: {
    fontSize: 22,  // Reduced font size for a more compact header
    fontFamily: "Poppins-Bold",
    color: "green",
  },
  icon: {
    padding: 8, // Reduced icon padding to make it smaller
  },
  sliderContainer: {
    width: width,
    height: height * 0.3,  // Reduced the height of the slider container
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: width,
    height: height * 0.25, // Reduced height for a more compact slider
  },
  itemContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: width,
  },
  image: {
    width: width * 0.9,
    height: height * 0.25,
    resizeMode: "cover",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  linesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
    width: '100%',
    position: 'absolute',
    bottom: 30, // Adjusted bottom position to fit the new header height
  },
  line: {
    width: 24,
    height: 4,
    margin: 5,
    borderRadius: 4,
    backgroundColor: "#bbb",
  },
  activeLine: {
    backgroundColor: "black",
  },
});
