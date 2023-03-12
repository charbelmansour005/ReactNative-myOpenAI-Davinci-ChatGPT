import React, { useCallback, useLayoutEffect, useMemo, useRef } from "react"
import { dependencies } from "../../helpers/dependencies"
import { View, Text } from "react-native"
import { styles } from "./styles"
import {
  Avatar,
  Card,
  Divider,
  IconButton,
  List,
  Paragraph,
} from "react-native-paper"
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import { MyScreenProps } from "./types"

const descriptions = {
  githubDescription: `charbelmansour005\ncraper16`,
  emailDescription: `charbelmansour005@gmail.com\ngeorgio.saad@gmail.com`,
}

const AboutUs = ({ navigation }: MyScreenProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = useMemo(() => ["20%", "50%", "100%"], [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "About us",
      headerStyle: {
        backgroundColor: "#343541",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "normal",
        fontSize: 17,
      },
      headerLeft: () => (
        <IconButton
          icon={"menu-right-outline"}
          onPress={() => navigation.toggleDrawer()}
          containerColor="#343541"
          iconColor="white"
        />
      ),
      headerShadowVisible: false,
    })
  })
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "#343541" }}>
      <Card mode="contained" style={styles.card}>
        <Card.Content>
          <List.Item
            title="Charbel Mansour"
            titleStyle={{ color: "white" }}
            descriptionStyle={{ color: "silver" }}
            description="Software Developer"
            left={() => (
              <Avatar.Image
                size={40}
                source={require("../../assets/private/charbel.jpeg")}
                style={styles.avatar}
              />
            )}
          />

          <List.Item
            title="Georgio Saad"
            titleStyle={{ color: "white" }}
            descriptionStyle={{ color: "silver" }}
            description="Software Engineer"
            left={() => (
              <Avatar.Image
                size={40}
                source={require("../../assets/private/georgio.jpeg")}
                style={styles.avatar}
              />
            )}
          />

          <Divider style={styles.divider} />

          <List.Item
            title="Github"
            titleStyle={{ color: "white" }}
            descriptionStyle={{ color: "silver" }}
            description={descriptions.githubDescription}
            left={() => <List.Icon icon="github" color="white" />}
          />

          <List.Item
            title="Email"
            titleStyle={{ color: "white" }}
            descriptionStyle={{ color: "silver" }}
            description={descriptions.emailDescription}
            left={() => <List.Icon icon="email" color="white" />}
          />
        </Card.Content>
      </Card>
      <View style={styles.containerSheet}>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enableOverDrag={false}
          handleIndicatorStyle={{ backgroundColor: "white" }}
          handleStyle={{
            backgroundColor: "#3e3f4b",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
          detached={true}
        >
          <View style={styles.contentContainerSheet}>
            <Paragraph style={{ color: "white" }}>Dependencies 🗃</Paragraph>
            <BottomSheetFlatList
              data={dependencies}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.dependencyContainer}>
                  <Text style={styles.dependencyName}>{item.name}</Text>
                  <Text style={styles.dependencyVersion}>{item.version}</Text>
                </View>
              )}
            />
          </View>
        </BottomSheet>
      </View>
    </View>
  )
}

export default AboutUs
