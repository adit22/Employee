
import React,{useEffect,useState,useContext} from 'react';
import { StyleSheet, Text, View,Image,FlatList,ActivityIndicator, Alert} from 'react-native';
import {Card,FAB} from 'react-native-paper'
import {useSelector,useDispatch} from 'react-redux'
import {mycontext} from '../App'



const Home=(props)=> {

    // const dispatch = useDispatch()
    // const {data,loading}= useSelector((state)=>{
    //     return state


    // })

    //without redux below
    // const [data,setdata]=useState([])
    // const [loading,setloading]=useState(true)
 //using context api
 
    const {state,dispatch} = useContext(mycontext)
    const {data,loading}=state
    const fetchdata=()=>{ 
        fetch("http://192.168.43.78:19000/")
        .then(res=>res.json())
        .then(result=>{
            // setdata(result)
            // setloading(false)
            dispatch({type:"ADD_DATA",payload:result})
            dispatch({type:"SET_LOADING",payload:false})
        }

        ).catch(err=>{
            Alert.alert("something went wrong")
        })

    }
    useEffect(()=>{
        fetchdata()

    },[])

    const renderlist= ((item)=>{
        return(
            
            <Card style={styles.mycard} onPress={()=>props.navigation.navigate("profile",{item:item})}>
            
            <View style={styles.cardview}>
            <Image style={{width:60,height:60,borderRadius:25}}
                   source={{uri:item.picture}}     
            />
            {/* <Text style={styles.text}>{item._id[]}</Text> */}
            <View style={{marginTop:10}}>
                
                <Text style={{fontSize:20,
                marginLeft:20}}>{item.name}</Text>
                <Text style={{fontSize:20,marginLeft:20}}>{item.position}</Text>
                    </View>
                    </View>
            </Card>
        )
        }
    )
    

    return(
        

        
        <Card style={{marginBottom:120}}>
            
            <Text style={{fontSize:30,marginLeft:80,fontStyle:"italic"}}>Know Your Mates</Text>

            
<View>


        <FlatList 
        data={data}
        renderItem={({item})=>
            {
               return renderlist(item);
            }
        }
        keyExtractor={item=>`${item._id}`}
        onRefresh={()=>fetchdata()}
        refreshing={loading}
        />

<FAB onPress={()=>props.navigation.navigate("create")}
            style={styles.fab}
            small={false}
            icon="plus"
            theme={{colors:{accent:"#006aff"}}}
            
        
        />
 
  
            
</View>
        
</Card>
    )
    
}
const styles=StyleSheet.create({
    mycard:{
        margin:4,
        padding:5,
        borderBottomWidth:3,
        
    },
    cardview:{
        flexDirection:"row",
        padding:4
    },
    text:{
        fontSize:20,
        marginLeft:20,
        marginTop:4
    },
    
    fab:{
        position:"absolute",
        margin:16,
        right:0,
        bottom:0
    },
})

export default Home

