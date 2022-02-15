import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { Text, TextInput, Alert, StyleSheet, Button, View  } from "react-native";


export default function App() {
  const [rates, setRates] = useState({});
  const [result, setResult] = useState("");
  const [currency, setCurrency] = useState("");
  const [toConvert, setToConvert] = useState("");

  useEffect(() => {
    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=def3a2f2f6284ec156705573774f6974`)
      .then((response) => response.json())
      .then((data) => {
        setRates(data.rates);
        console.log(data.rates);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }, []);

  const convert = () => {
    let result = toConvert * rates[currency];
    setResult(result);
  };
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={styles.input}
        keyboardType={"numeric"}
        value={toConvert}
        placeholder="Amount of €"
        onChangeText={(toConvert) => setToConvert(toConvert)}
      ></TextInput>
      <Button title="Convert" color ="red" onPress={() => convert()}></Button>
      <View>
        <Picker
          selectedValue={currency}
          style={{ height: 60, width: 225 }}
          onValueChange={(itemValue, itemIndex) => {
            setCurrency(itemValue);
          }}>

          <Picker.Item label="----" value="" />
          {Object.keys(rates).map((rate) => {
            return <Picker.Item  label={rate} value={rate} />;
          })}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 175,
    borderColor: "black",
    borderWidth: 2,
    textAlign: "center",
    margin: 9,
    height: 40,
  },
});