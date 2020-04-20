import React, { useState } from 'react';
import { StyleSheet, Text, View,Image,FlatList,Modal,Linking,Platform, Alert} from 'react-native';
import { TextInput,Title,Card,Button } from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons,Entypo} from '@expo/vector-icons'

const Profile = (props)=> {

    const {_id,name,email,salary,phone,position,picture}= props.route.params.item
console.log(_id)
const delempl=()=>{
    fetch("http://192.168.43.78:19000/delete",{
    method:"post",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        id:_id
    })
}).then(res=>res.json())
.then(delempl=>{
    Alert.alert(`${delempl.name} is deleted`)
    // props.navigation.navigate("Home")
}).catch(err=>{
    Alert.alert(err)
})
}
    const opendial=()=>{
if(Platform.OS === "android"){
Linking.openURL(  `tel:${phone}`)
}
else{
    Linking.openURL(`telprompt:${phone}`)
}
}

    return(

<View style={styles.root}>

<LinearGradient 
colors={["#0033ff","#6bc1ff"]}
style={{height:"20%"}}
/>
<View style={{alignItems:"center"}}>
<Image 
style={{width:120,height:120,borderRadius:60,marginTop:-50}}
source={{uri:picture}}
/>
</View>

<View style={{alignItems:"center"}}>
<Title>

{name}
</Title>
<Text style={{fontSize:20}}>{position}</Text>


</View>


<Card style={styles.mycard} onPress={()=>(

    Linking.openURL(`mailto:${email}`)
)}>
<View style={styles.cardcontent}>
<MaterialIcons name="email" size={32} color="#0033ff">


</MaterialIcons>
<Text style={{fontSize:15,marginLeft:20,marginTop:5}}>
{email}</Text>

</View>

</Card>

<Card style={styles.mycard} onPress={()=>opendial()}>
<View style={styles.cardcontent}>
<Entypo name="phone" size={32} color="#0033ff">


</Entypo>
<Text style={{fontSize:15,marginLeft:20,marginTop:5}}>
{phone}</Text>

</View>

</Card>

<Card style={styles.mycard}>
<View style={styles.cardcontent}>
<MaterialIcons name="attach-money" size={32} color="#0033ff">
</MaterialIcons>
<Text style={{fontSize:15,marginLeft:20,marginTop:5}}>
{salary}</Text>

</View>

</Card>
<View style={{flexDirection:"row",justifyContent:"space-around",marginTop:10}}>
<Button icon="account-edit" mode="contained" onPress={()=>
    {props.navigation.navigate("create",{_id:_id,name:name,email:email,salary:salary,phone:phone,position:position,picture:picture}
    )}}>
Update

</Button>

<Button icon="delete" mode="contained" onPress={()=>delempl()}>
Delete  

</Button>

</View>
</View>
    )
}


const styles=StyleSheet.create({
root:{
    flex:1
},
mycard:{
    margin:3,
    marginLeft:50,
    marginRight:50,
    marginTop:20
},
cardcontent:{
    flexDirection:"row",
    padding:8
}

})
export  default Profile