const fs= require('fs')                           //useful npm libraries               
const chalk = require('chalk')
const http = require('http')
const promise = require('promise')

const getServer= (server)=> {                       //getServer() Method with argument as a single server object

        return new Promise((resolve,reject)=>{               //returning promise  
            setTimeout(()=>{
            
                http.get(server.url,(res)=>{
                    const {statusCode}=res                      // status code for offline or online

                    if(statusCode<200 ||statusCode>299)
                        //return reject('server : '+server.url+' is offline')
                        return reject(new Error(chalk.red.inverse(server.url+'is Offline ')))      //error Statement
                    resolve(server)                                                               //resolving promise
                            
                        
                })        
            },5000)
        })
 }


 // Testing
const test =()=>{
    const serversBuffer = fs.readFileSync('servers.json')       // sample servers JSON file
    const serversData = JSON.parse(serversBuffer)               // json --> array
                                    
         var priority = Number.MAX_SAFE_INTEGER                 // temperary variables for comparing
         var url = ''
    
    
    serversData.forEach((server)=>{                              // loop for each server in array\

        getServer(server).then((server)=>{                       //resolving online array

            if(server.priority<minPriority)                      // getting minimum priority server
            {
                priority=server.priority
                url= server.url
            }
        }).catch((e)=>{                                          // reject statement
            console.log(e)
        })
    })

    console.log("Lowest Priority Server is :"+url +'with Priority'+priority)       //final Output
    

}
   
test()                                                                      // calling test 

