import React, { useState } from 'react';
import { StyleSheet, Text, View,Image,FlatList,Modal,Alert,KeyboardAvoidingView} from 'react-native';
import {TextInput,Button} from 'react-native-paper'

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const CreateEmployee=({navigation,route})=>{
    
        const getdetails=(type)=>{
            if(route.params){
                switch(type){
                case "name":
                    return route.params.name
                case "email":
                    return route.params.email
                case "phone":
                    return route.params.phone
                case "salary":
                    return route.params.salary
                case "picture":
                    return route.params.picture
                case "position":
                    return route.params.position
            }
        }
            return ""
        
        }
const [name,setname]=useState(getdetails("name"))
const [phone,setphone]=useState(getdetails("phone"))
const [email,setemail]=useState(getdetails("email"))
const [salary,setsalary]=useState(getdetails("salary"))
const [picture,setpic]=useState(getdetails("picture"))
const [position,setpos]=useState(getdetails("position"))
const [modal,setmodal]=useState(false)
const [enabelshift,setenabelshift]=useState(false)


const submitdata=()=>{
if(name!="" && email!="" && phone!="" && salary!="" && position!="" && picture!="" ){
    if( phone.length==10 || phone.length>10){
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    if( expression.test(String(email).toLowerCase())){
        fetch("http://192.168.43.78:19000/send",{
    method:"post",
    headers:{
        'Content-Type':"application/json"
    },
    body:JSON.stringify({
       
        name:name,
        email:email,
        phone:phone,
        salary:salary,
        position:position,
        picture:picture
        
    })
})
.then(res=>res.json())
.then(data=>{
    
    // console.log(typeof(data))
    // console.log("trying to upload")
    Alert.alert(`${data.name} is saved successfully`)
    
    // navigation.navigate("Home")
}).catch(err=>{
    Alert.alert("hell")
    
})
    }
        
        
        else{
            Alert.alert("Invalide Email")
        }
    }
    else{
        Alert.alert("invalid phone number")
    }
    
}

else{
    Alert.alert("Enter All Information")
}


}

const editdata=()=>{
    fetch("http://192.168.43.78:19000/update",{
        method:"post",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify({
            id:route.params._id,
            name:name,
            email:email,
            phone:phone,
            salary:salary,
            position:position,
            picture:picture
            
        })
    })
    .then(res=>res.json())
    .then(data=>{
        
        // console.log(typeof(data))
        // console.log("trying to upload")
        Alert.alert(`${data.name} is updated successfully`)
        
        // navigation.navigate("Home")
    }).catch(err=>{
        Alert.alert("hell")
        
    })

}
const pickfromgallery=async()=>{

  const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(granted){
       let data= await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:1


        })
        if(!data.cancelled){
            let newfile={uri:data.uri,type:`test/${data.uri.split('.')[1]}`,name:`test.${data.uri.split('.')[0]}`}
            handleupload(newfile)
        console.log(data)
        }
        
        
    }
    else{
        Alert.alert("give permission to work")
    }
}

const pickfromcamera=async()=>{
    //console.log("hey")
    const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
      if(granted){
         let data= await ImagePicker.launchCameraAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              aspect:[1,1],
              quality:1
  
  
          })
          if(!data.cancelled){
              let newfile={uri:data.uri,type:`test/${data.uri.split('.')[1]}`,name:`test.${data.uri.split('.')[0]}`}
              
              handleupload(newfile)
            console.log(data)

          }
                }
      else{
          Alert.alert("give permission to work")
      }
  }

  const handleupload=(image)=>{

    const data=new FormData()
    data.append('file',image)
    data.append('upload_preset','employeeapp')
    data.append('cloud_name',"ditqijxk0")
    fetch("https://api.cloudinary.com/v1_1/ditqijxk0/image/upload",{
        method:"post",
        body: data
        
    }).then(res => res.json()).then(data=>{
        console.log(data)
        
        setpic(data.url)
        setmodal(false)
    }).catch(err=>{
        Alert.alert("somethingg went wrong")
    })
  }
    return(
<KeyboardAvoidingView style={styles.root} behavior="position" enabled={enabelshift}>
<View >

<TextInput 
label='name'
style={styles.inputstyle}
value={name}
onFocus={()=>setenabelshift(false)}
onChangeText={text => setname(text)}
mode='outlined'
theme={theme}

/>

<TextInput 
label='phone'
style={styles.inputstyle}
value={phone}
onFocus={()=>setenabelshift(false)}
onChangeText={text => setphone(text)}
mode='outlined'
keyboardType="number-pad"
theme={theme}

/>

<TextInput 
label='email'
style={styles.inputstyle}
value={email}
onFocus={()=>setenabelshift(false)}
onChangeText={text => setemail(text)}
mode='outlined'
theme={theme}

/>

<TextInput 
label='salary'
style={styles.inputstyle}
value={salary}
onFocus={()=>setenabelshift(true)}
onChangeText={text => setsalary(text)}
mode='outlined'
keyboardType="number-pad"
theme={theme}

/>

<TextInput 
label='position'
style={styles.inputstyle}
value={position}
onFocus={()=>setenabelshift(true)}
onChangeText={text => setpos(text)}
mode='outlined'
//keyboardType="number-pad"
theme={theme}

/>
<View>
<Button theme={theme} style={{marginTop:10,marginLeft:100,marginRight:100,flexDirection:"column"}} icon={picture==""?"upload":"check"} mode="contained" onPress={()=>setmodal(true)}>
    Upload Image 


</Button>
{route.params? <Button theme={theme} style={{marginTop:10,marginLeft:100,marginRight:100}} icon={picture==""?"upload":"check"} mode="contained" onPress={()=>editdata()}>
    Edit Data 


</Button>:
<Button theme={theme} style={{marginTop:10,marginLeft:100,marginRight:100}} icon="upload" mode="contained" onPress={()=>submitdata()}>
    Save Data 


</Button>
} 

</View>
<Modal 
animationType="fade"
transparent={true}
visible={modal}
onRequestClose={()=>setmodal(false)}
>
<View style={styles.modalview}>
    <View style={{marginTop:150,marginLeft:20}}>
    <Button theme={theme} style={{margin:2, flexDirection:"row",marginLeft:100,marginRight:100,marginTop:4}} icon="image-area"  onPress={()=>pickfromgallery()}>
    From Gallery


</Button>
<Button theme={theme} style={{margin:2, flexDirection:"row",marginLeft:100,marginRight:100}} icon="camera"  onPress={()=>pickfromcamera()}>
    From Camera


</Button>


</View>
<View >


<Button theme={theme} style={{margin:2,flexDirection:"row",marginLeft:120,marginRight:100}} icon="camera" onPress={()=>setmodal(false)}>
    Cancel


</Button>

</View>

</View>
</Modal>

</View>
</KeyboardAvoidingView>
    )
}
const theme={
    colors:{primary:"#006aff"}
}
const styles=StyleSheet.create({

    root:{
        flex:1
        
    },

    inputstyle:{
margin:-2,
marginLeft:10,
marginRight:10,
marginTop:10,
backgroundColor:"#D3D3D3"

    },
    modalview:{
        position:"absolute",
        bottom:2,
        width:"100%"

    }
})
export default CreateEmployee