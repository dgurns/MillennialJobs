import React, { Component } from 'react';
import { View } from 'react-native';
import Button from '../components/Button';

class TitleScreen extends Component {
  render() {
    return (
      <View>
        <Button
          onPress={() => {}}
          size='large'
          buttonText='Go'
        />
      </View>
    );
  }
}

export default TitleScreen;
