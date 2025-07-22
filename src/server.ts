// server
import app from "./app"
const port = 3000|| process.env.PORT;

app.listen(port,(err)=>{
    if(err) throw new Error("server is asleep")
        console.log(`server is up on http://localhost:${port}/`)
})
                                        