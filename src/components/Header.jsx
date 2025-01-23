import React, { useState, useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Modal } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuIcon from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get("window");

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false); // State for menu visibility
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
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <MenuIcon name="menu" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Vurimi AI</Text>
        <Icon name="bell" size={30} color="black" style={styles.icon} />
      </View>

      {/* Slider Section */}
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

      {/* Menu Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => alert("Cart selected")}>
              <Text style={styles.menuText}>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => alert("About Us selected")}>
              <Text style={styles.menuText}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => alert("My Profile selected")}>
              <Text style={styles.menuText}>My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeMenu} onPress={() => setMenuVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "green",
  },
  icon: {
    padding: 8,
  },
  sliderContainer: {
    width: width,
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: width,
    height: height * 0.25,
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
    bottom: 30,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  menuText: {
    fontSize: 18,
    textAlign: "center",
  },
  closeMenu: {
    marginTop: 10,
  },
  closeText: {
    fontSize: 16,
    color: "red",
  },
});
