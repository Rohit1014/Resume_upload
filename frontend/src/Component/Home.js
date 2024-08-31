import React from "react";
function Home(){
  const  user=localStorage.getItem("val")
    return(
        <div>
            <h1>welcome {JSON.parse(user).name}</h1>
            </div>
    )
}
export default Home;