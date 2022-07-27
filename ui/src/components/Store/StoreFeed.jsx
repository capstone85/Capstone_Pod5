import * as React from "react"
// import "./StoreFeed.css"
import StoreCard from "./StoreCard"
import apiClient from "../../services/apiClient"
import { useEffect, useState } from "react"

export default function StoreFeed(props){
    // const overview = [
    //     {id: 1, name : "apple", url : "", calories : 500, quantity: 2, date: "01/11/2000", category: "fruit"},
    //     {id: 2, name : "milk", url : "", calories : 100, quantity: 3, date: "12/11/2055", category: "dairy"},
    //     {id: 3, name : "carrot", url : "", calories : 220, quantity: 1, date: "01/16/2023", category: "vegetables"},
    //     {id: 4, name : "bread", url : "", calories : 660, quantity: 1, date: "01/16/2023", category: "carbs"}
    // ]
    const [isFetching, setIsFetching] = useState(false)
    const [store, setStore] = useState([])
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchStores = async () => {
          if(!(Object.keys(props.user).length === 0)){
            setIsFetching(true)
            console.log("users.", props.user)
        
            const { data, error } = await apiClient.listStores(props.user.id)
            if(error){
                setError(error)
            }
            if(data){
                console.log("data", data)
                setStore(data.stores)
            }
            setIsFetching(false)
          }
        }
    
        fetchStores()
      }, [])
    return (
        <div className="store-feed">
            {store.length === 0 ?
            <div className="empty">
                <h2>Nothing here yet.</h2>
            </div>
            :
            store.map((element, idx) => {
                const date = new Date(element.created_at)
                const enUSFormatter = new Intl.DateTimeFormat('en-US')
                return <StoreCard key={idx} name={element.name} location={element.location} description={element.description} logo={element.logo} created_at={enUSFormatter.format(date)}></StoreCard>
            })}
        </div>
    )
}