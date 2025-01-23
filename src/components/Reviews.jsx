import React, { useState, useRef } from "react";
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const reviewsData = [
    {
      id: "1",
      image: require('../assets/images/avatar.jpg'),
      name: "John Doe",
      experience: "Great experience! The service was fantastic.",
      rating: 4,
    },
    {
      id: "2",
      image: require('../assets/images/avatar.jpg'),
      name: "Jane Smith",
      experience: "Excellent support and quick response time!",
      rating: 5,
    },
    {
      id: "3",
      image: require('../assets/images/avatar.jpg'),
      name: "Sam Wilson",
      experience: "Very professional and attentive to detail.",
      rating: 4,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.reviewContent}>
        <View style={styles.stars}>
          {Array.from({ length: 5 }, (_, index) => (
            <Icon
              key={index}
              name={index < item.rating ? "star" : "star-o"}
              size={18}
              color={index < item.rating ? "#FFD700" : "#D3D3D3"}
            />
          ))}
        </View>
        <Text style={styles.reviewerName}>{item.name}</Text>
        <Text style={styles.experience}>{item.experience}</Text>
      </View>
    </View>
  );

  const handleLeftArrow = () => {
    const newIndex = (activeIndex - 1 + reviewsData.length) % reviewsData.length;
    setActiveIndex(newIndex);
    flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
  };

  const handleRightArrow = () => {
    const newIndex = (activeIndex + 1) % reviewsData.length;
    setActiveIndex(newIndex);
    flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Reviews</Text>

      <View style={styles.sliderContainer}>
        <TouchableOpacity style={[styles.arrow, { left: 0 }]} onPress={handleLeftArrow}>
          <Icon name="chevron-left" size={30} color="black" />
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          data={reviewsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderContentContainer}
          extraData={activeIndex}
        />

        <TouchableOpacity style={[styles.arrow, { right: 7 }]} onPress={handleRightArrow}>
          <Icon name="chevron-right" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "green",
    marginBottom: 20,
    textAlign: "center",
  },
  sliderContainer: {
    position: "relative",
  },
  sliderContentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.8,
    height: 250,
    marginHorizontal: 27,
    marginBottom: 10, // Added marginBottom to create space
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
    marginBottom: 10,
  },
  reviewContent: {
    padding: 10,
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
    marginBottom: 10,
  },
  reviewerName: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginBottom: 5,
  },
  experience: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#555",
    textAlign: "center",
  },
  arrow: {
    position: "absolute",
    top: "40%",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    opacity: 0.8,
    zIndex: 1,
    borderRadius: 20,
  },
});
