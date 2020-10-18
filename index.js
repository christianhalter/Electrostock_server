var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));


var elec_comp =[{
  "internal_code": "00001",
  "manf_number": "ERJ-PB3B1002V",
  "manufacturer": "Panasonic Electronic Components",
  "description": "RES SMD 10K OHM 0.1% 1/5W 0603",
  "digikey_link": "https://www.digikey.com/short/zwbwff",
  "image": "https://media.digikey.com/Photos/Panasonic%20Photos/MFG_ERJ-P6W%20Series.jpg",
  "price": 0.23,
  "stock": 1000,
  "datasheet": "https://industrial.panasonic.com/cdbs/www-data/pdf/RDM0000/AOA0000C328.pdf",
  "category": "Resistor",
  "package": "0603",
  "value": 10,
  "unit": "K"
},
{
  "internal_code": "00002",
  "manf_number": "CL10F104ZB8NNNC",
  "manufacturer": "Samsung Electro-Mechanics",
  "description": "CAP CER 0.1UF 50V Y5V 0603",
  "digikey_link": "https://www.digikey.com/short/zwbndm",
  "image": "https://media.digikey.com/Renders/Samsung%20Electro-Mechanics%20America/0805-(1.40)-CL-Series.jpg",
  "price": 0.10,
  "stock": 600,
  "datasheet": "http://www.samsungsem.com/kr/support/product-search/mlcc/CL10F104ZB8NNNC.jsp",
  "category": "Capacitor",
  "package": "0603",
  "value": 100,
  "unit": "nF"
},
{
  "internal_code": "00003",
  "manf_number": "PESD1CAN-UX",
  "manufacturer": "Nexperia USA Inc.",
  "description": "TVS DIODE 24V 50V SC70-3",
  "digikey_link": "https://www.digikey.com/short/zwbnvb",
  "image": "https://media.digikey.com/Photos/Nexperia/MFG_SOT323.jpg",
  "price": 0.38,
  "stock": 20,
  "datasheet": "https://assets.nexperia.com/documents/data-sheet/PESD1CAN-U.pdf",
  "category": "Diode",
  "package": "SOT-323",
  "value": 24,
  "unit": "V"
},
{
  "internal_code": "00004",
  "manf_number": "LPC4337JBD144E",
  "manufacturer": "NXP USA Inc.",
  "description": "IC MCU 32BIT 1MB FLASH 144LQFP",
  "digikey_link": "https://www.digikey.com/short/zwbdtz",
  "image": "https://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/144-LQFP.jpg",
  "price": 14.33,
  "stock": 0,
  "datasheet": "https://www.nxp.com/docs/en/data-sheet/LPC435X_3X_2X_1X.pdf",
  "category": "Microcontroller",
  "package": "144-LQFP",
  "value": null,
  "unit": null
}]

var pcb =[{
  "pcb_code": "PCB1",
  "elec_comp_id": "00004",
  "quantity": 1
},
{
  "pcb_code": "PCB1",
  "elec_comp_id": "00001",
  "quantity": 5
},
{
  "pcb_code": "PCB1",
  "elec_comp_id": "00002",
  "quantity": 3
},
{
  "pcb_code": "PCB2",
  "elec_comp_id": "00002",
  "quantity": 1
},
{
  "pcb_code": "PCB2",
  "elec_comp_id": "00001",
  "quantity": 2
}]

app.get("/elec-comp",function(req,res){
   res.send(elec_comp);
        return;
});

app.get("/pcb",function(req,res){
  res.send(pcb);
       return;
});


app.get("/loquesea",function(req,res){

	 res.send("respuesta");    

});

app.get("/elec-comp/:internal_code",function(req,res){
  console.log(req.params.internal_code);
    if((req.params.internal_code!=undefined)&&(req.params.internal_code!="")){
      var producto={};
       elec_comp.forEach(item=>{
    
        if(item.internal_code==req.params.internal_code){
        
          producto= item;
         
        }
      });
      res.send(producto);
      return; 
     
    }else{
        res.send({'type': 'error'});
        return; 
    }
  
});

app.get("/pcb/:pcb_code",function(req,res){
  console.log(req.params.pcb_code);
    if((req.params.pcb_code!=undefined)&&(req.params.pcb_code!="")){
      var producto={};
       pcb.forEach(item=>{
    
        if(item.pcb_code==req.params.pcb_code){
        
          producto= item;
         
        }
      });
      res.send(producto);
      return; 
     
    }else{
        res.send({'type': 'error'});
        return; 
    }
  
});




app.post("/login",function(req,res){
        console.log("Llego al servidor "+JSON.stringify(req.body));
        
       
        if(req.body.email!=undefined && req.body.password!=undefined){
            if(req.body.email==="usuario"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'User'}")
                res.send({'type': 'User'});    
            }else if(req.body.email==="admin"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'Admin'}")
                res.send({'type': 'Admin'});    
            }else{
                console.log("Sale del servidor "+"{'type': 'error'}")
                res.send({'type': 'error'});
            }
            return;
        }
        console.log("Sale del servidor "+"{'type': 'error'}")
        res.send({'type': 'error'});
});


app.post("/elec-comp",function(req,res){
  console.log(req.body);
  if((req.body.manf_number!= undefined&&req.body.manf_number!= "")&&(req.body.internal_code!= undefined&&req.body.internal_code!= "")){
    var data = {"internal_code":req.body.internal_code,"manf_number":req.body.manf_number,"manufacturer":req.body.manufacturer,"description":req.body.description,"digikey_link":req.body.digikey_link,"image":req.body.image,"price":req.body.price,"stock":req.body.stock,"datasheet":req.body.datasheet,"category":req.body.category,"package":req.body.package,"value":req.body.value,"unit":req.body.unit};
    elec_comp.push(data);
    res.send(data);
    
    return;
  }
  res.send({'type': 'error'});
});

app.post("/pcb",function(req,res){
  console.log(req.body);
  if((req.body.pcb_code!= undefined&&req.body.pcb_code!= "")&&(req.body.elec_comp_id!= undefined&&req.body.elec_comp_id!= "")){
    var data = {"pcb_code":req.body.pcb_code,"elec_comp_id":req.body.elec_comp_id,"quantity":req.body.quantity};
    elec_comp.push(data);
    res.send(data);
    
    return;
  }
  res.send({'type': 'error'});
});

app.put("/elec_comp/:internal_code",function(req,res){
  console.log(req.params.internal_code);
  console.log(req.body);

  if((req.body.manf_number!= undefined&&req.body.manf_number!= "")&&(req.body.internal_code!= undefined&&req.body.internal_code!= "")){
    for(var i =0;i<elec_comp.length;i++){
					if(req.params.internal_code== elec_comp[i].internal_code){
            console.log("Atualiza")
						elec_comp[i].manf_number=req.body.manf_number;
						elec_comp[i].manufacturer=req.body.manufacturer;
						elec_comp[i].description=req.body.description;
            elec_comp[i].digikey_link=req.body.digikey_link;
            elec_comp[i].image=req.body.image;
            elec_comp[i].price=req.body.price;
            elec_comp[i].stock=req.body.stock;
            elec_comp[i].datasheet=req.body.datasheet;
            elec_comp[i].category=req.body.category;
            elec_comp[i].package=req.body.package;
            elec_comp[i].value=req.body.value;
            elec_comp[i].unit=req.body.unit;

						res.send(req.body);    
						return;
					}
				}
		
        }
        res.send({'type': 'error'});
    
});

app.put("/pcb/:pcb_code",function(req,res){
  console.log(req.params.pcb_code);
  console.log(req.body);

  if((req.body.pcb_code!= undefined&&req.body.pcb_code!= "")&&(req.body.elec_comp_id!= undefined&&req.body.elec_comp_id!= "")){
    for(var i =0;i<pcb.length;i++){
					if((req.params.pcb_code== pcb[i].internal_code)&&(req.params.elec_comp_id==pcb[i].elec_comp_id)){
            console.log("Atualiza")
						pcb[i].quantity=req.body.quantity;
						
						res.send(req.body);    
						return;
					}
				}
		
        }
        res.send({'type': 'error'});
    
});



app.delete("/elec_comp/:internal_code",function(req,res){
        
       console.log(req.params.internal_code);
        if(req.params.internal_code!= undefined){
	
			for(var i =0;i<elec_comp.length;i++){
					if(req.params.internal_code== elec_comp[i].internal_code){
						elec_comp.splice(i,1);
        	var data = {"type":"ok"};
							res.send(data);    
							return;
					}
				}
			
			

        }
        else{
          res.send({'type': 'error'});
        }
        
    
});

app.delete("/pcb/:pcb_code",function(req,res){
        
  console.log(req.params.pcb_code);
   if(req.params.pcb_code!= undefined){

 for(var i =0;i<pcb.length;i++){
     if(req.params.pcb_code== pcb[i].internal_code){
       pcb.splice(i,1);
     var data = {"type":"ok"};
         res.send(data);    
         return;
     }
   }
 
 

   }
   else{
     res.send({'type': 'error'});
   }
   

});

app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});
