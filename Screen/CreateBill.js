import { React, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { PdfCode } from "../Components/CodePdf";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import dateFormat from "dateformat";

/**
 * @author Ritesh Sharma
 * @function CreateBill
 **/
export const CreateBill = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [product, setProduct] = useState("Tea");
  const productList = ["Tea", "Coffee", "Maggie", "Pen", "Coco Cola"];
  const [Quantity, setQuantity] = useState(0);
  const now = new Date();
  const [Invoice, setInvoice] = useState(dateFormat(now, "ddmmyyhhMss"));
  const [Total, setTotal] = useState("");
  const [ReceivedBalance, SetReceivedBalance] = useState("");
  const [PaymentType, setPaymentType] = useState("Credit");
  const [RemaningBalance, setRemaningBalance] = useState("Paid");
  //const [selectedPrinter, setSelectedPrinter] = React.useState();

  const generateInvoice = async () => {
    const html = PdfCode(
      name,
      address,
      mobileNo,
      Quantity,
      Invoice,
      product,
      Total,
      ReceivedBalance,
      PaymentType,
      RemaningBalance
    );
    try {
      const { uri } = await Print.printToFileAsync({ html });
      console.log("File has been saved to:", uri);
      await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    } catch (err) {
      console.log(
        "Make shure You have Internet Connection or contact @+91 8530730017",
        err
      );
    }
  };
  const { container, inputContainer, textInput, pickerContainer } = styles;
  return (
    <View style={container}>
      <ScrollView>
        <View style={inputContainer}>
          <Text>Name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Full Name"
            style={textInput}
          />
        </View>
        <View style={inputContainer}>
          <Text>Address</Text>
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholder="Address"
            style={textInput}
          />
        </View>
        <View style={inputContainer}>
          <Text>Mobile No.</Text>
          <TextInput
            value={mobileNo}
            keyboardType="number-pad"
            onChangeText={(text) => setMobileNo(text)}
            placeholder="Mobile No."
            style={textInput}
          />
        </View>
        <View style={inputContainer}>
          <Text>Product: </Text>
          <View style={pickerContainer}>
            <Picker
              selectedValue={product}
              onValueChange={(item, index) => setProduct(item)}
            >
              {productList.map((item,index) => (
                <Picker.Item label={item} value={item} key={index} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text>Quantity : </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(text) => setQuantity(text)}
            value={Quantity}
            placeholder="Quantity"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Invoice No : </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setInvoice(text)}
            value={Invoice}
            placeholder="Invoice No"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Total : </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(text) => setTotal(text)}
            value={Total}
            placeholder="Total ₹"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Received Amount : </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(text) => SetReceivedBalance(text)}
            value={ReceivedBalance}
            placeholder="Received Amount ₹"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Remaining Balance : </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(text) => setRemaningBalance(text)}
            value={RemaningBalance}
            placeholder="Remaining Balance ₹"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Payment Method : </Text>
          <View style={styles.PickerContainer}>
            <Picker
              selectedValue={PaymentType}
              style={styles.Picker}
              onValueChange={(itemValue, itemIndex) =>
                setPaymentType(itemValue)
              }
            >
              <Picker.Item label="Credit" value="Credit" />
              <Picker.Item label="Cash" value="Cash" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        </View>
        <Button title="Genearte Invoice" onPress={generateInvoice} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  textInput: {
    marginTop: 15,
    height: 40,
    width: 300,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    marginBottom: 6,
  },
  pickerContainer: {
    borderColor: "#000",
    height: 40,
  },
});
