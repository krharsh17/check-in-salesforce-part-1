import { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import { getCheckins } from "../util/datastore";
import {fetchLeads} from '../util/salesforce-helper'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'white',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemIndex: {
    marginRight: 12
  }
});

const ViewCheckins = () => {
  const [checkins, setCheckins] = useState([])

  const [leads, setLeads] = useState([])

  const findLead = email => {
    const lead = leads.find(data => data.Email === email)

    return lead || {}
  }

  useEffect(() => {
    getCheckins().then(r => {
      setCheckins(r)
    })

    fetchLeads(r => {
      setLeads(r)
    }, error => console.log(error))
  }, [])

  return <View style={styles.container}>
    <FlatList
      data={checkins}
      renderItem={({ item, index }) => <View style={styles.item}>
        <Text style={styles.itemIndex}>{index + 1}.</Text>
        <View>
          <Text style={{fontWeight: '700'}}>{findLead(item.email).FirstName + " " + findLead(item.email).LastName + " | " + findLead(item.email).Company + " | " + findLead(item.email).Email}</Text>
          <Text>{"Checked in at " + item.checkinTime}</Text>
        </View>
      </View>}
      keyExtractor={(item, index) => 'key_' + index}
    />
  </View>
}

export default ViewCheckins