import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

const DATA = [
  {
    id: 1,
    text: "Aseem Regmi",
    uri:
      "https://scontent.fktm6-1.fna.fbcdn.net/v/t1.0-9/29792244_2039457616067868_6795094108625960960_n.jpg?_nc_cat=111&_nc_ht=scontent.fktm6-1.fna&oh=cadcb9cbebc17fb4f0f8df313c7e9006&oe=5D99B0D2",
    fblink: "https://www.facebook.com/aseemr3"
  },
  {
    id: 2,
    text: "Namit Adhikari",
    uri:
      "https://scontent.fktm6-1.fna.fbcdn.net/v/t1.0-9/59859827_2463099017090534_1450757862878871552_n.jpg?_nc_cat=104&_nc_ht=scontent.fktm6-1.fna&oh=cebb22136de577f5e1e3a91358025c75&oe=5D843C8F",
    fblink: "https://www.facebook.com/a1namit"
  },
  {
    id: 3,
    text: "Niranjan Pant",
    uri:
      "https://scontent.fktm6-1.fna.fbcdn.net/v/t1.0-9/53283514_2127837877299787_7089704486897188864_n.jpg?_nc_cat=110&_nc_ht=scontent.fktm6-1.fna&oh=8719340ac465a47be1e5efc9ea6edcc1&oe=5D9B0CE3",
    fblink: "https://www.facebook.com/niranjan.panta.1"
  },
  {
    id: 4,
    text: "Skanda Aryal",
    uri:
      "https://scontent.fktm6-1.fna.fbcdn.net/v/t1.0-9/60292306_1539475502854496_2125552003093364736_n.jpg?_nc_cat=110&_nc_ht=scontent.fktm6-1.fna&oh=8c645cd0c76255d591e4a5380147395d&oe=5D8FDC66",
    fblink: "https://www.facebook.com/skanda.aryal.12"
  }
];

class AboutUs extends Component {
  render() {
    return (
      <View style={styles.container}>
        {DATA.map(user => (
          <View key={user.text}>
            <Avatar
              rounded={true}
              title={user.text}
              size="large"
              // containerStyle={styles.avatarContainerStyle}
              source={{
                uri: user.uri
              }}
            />
            <Text>{user.text}</Text>
          </View>
        ))}
      </View>
    );
  }
}
export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  avatarContainerStyle: {
    // height: 50,
    // width: 50,
    // borderRadius: 25,
    // overflow: "hidden"
  }
});
