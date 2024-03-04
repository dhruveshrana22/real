import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const IntroductionScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require('../Images/Dumble.png'),
    require('../Images/muscal.png'),
    require('../Images/Runner.png'),
    require('../Images/Yoga.png'),

  ];

  const texts = [
    'Welcome to our app! Swipe through to learn more.',
    'Feature 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Feature 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Feature 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    "Get Started! You're all set to use our app.",
  ];

  const handleNext = () => {
    if (currentIndex === images.length - 1) {
      navigation.navigate('Login');
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <View style={styles.carouselContainer}>
        <TouchableOpacity style={styles.arrow} onPress={handlePrevious}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
        <Image style={styles.image} source={images[currentIndex]} />
        <TouchableOpacity style={styles.arrow} onPress={handleNext}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? 'red' : 'gray' },
            ]}
          />
        ))}
      </View>
      <Text style={styles.text}>{texts[currentIndex]}</Text>
      <View
        style={{
          position: 'absolute',
          bottom: 60,
          borderRadius: 10,
          width: '60%',
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '30',
          color: 'purple',
        }}>
        <Button
          title={currentIndex === images.length - 1 ? 'Get Started!' : 'Next'}
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#DCC2B0',
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  skipText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrow: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 15,
  },
  arrowText: {
    fontSize: 23,
    color: 'purple',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    height: 90,
  },
  button: {
    color: 'purple',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IntroductionScreen;
