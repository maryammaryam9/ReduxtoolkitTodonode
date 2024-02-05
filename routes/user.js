const router = require("express").Router();
const User = require("../models/user");
const passwordHash = require("password-hash");
const jwtSECRETKEY="hsdgfjhfsdgkjsfdh"
let  jwt=require("jsonwebtoken");

const Todo=require("../models/todo")
router.post("/create", async (req, res) => {
  console.log(req.body, "req.body is here");
  console.log("123");
try {
  
  let body = req.body;
  // Hash the password
  var encryptpass = passwordHash.generate(body.password);
  body.password = encryptpass;

  console.log(body, "here the body");

  let check = await User.findOne({
    $or: [{ email: body.email }, { username: body.username }],
  });

  if (check) {
    res.json({ message: "Email or UserName Already Exists", status: 0 });
  } else {
    let data = await User.create(body);
    res.json({ status: 1, message: "Success", data: data });
  }
} catch (error) {
    console.log(error.message ," this is catch error ");
    res.json({ status: 0, message: error.message });
     
}



});




  // verify JWT 
const requireLogin=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
    return res.json({status:0,message:"You must be logged In"})
    }
    try {
       const {id}=jwt.verify(authorization, jwtSECRETKEY);
         loginId=id
        //   ye login user ki id pari hui hai 
   next();
      } catch (error) {
       return res.json({message:error.message ,b:"ye catch mai gira hai "});
    }

}



router.get('/testing',requireLogin,(req,res)=>{
    res.json({message:req.user });
  
});

router.get( '/',(req,res)=>{
 res.json(("hello i am maryam zafar "));
});


  router.post("/login", async (req, res) => {
    console.log(
      req.body,
      "here is the body of the login employee api-==========================================================================="
    );
    let body = req.body;
    try {
    let check = await User.findOne({ email: body.email, status: 1 });
    console.log(check, "here is the check variable");
    if (check!=null) {
          if (check && passwordHash.verify(body.password, check.password)) {
      let  user=   await User.findByIdAndUpdate({ _id: check._id }, { new: true });
        // res.json({ status: 1, message: 'success', check })
        let tkn = jwt.sign({ id: check._id }, jwtSECRETKEY);
        console.log(tkn, "here is the tkn 1231231312312312312321132");
        return res.json({
          status: 1,
          jwt: tkn,
          data: user,
          message: "success",
        });
      } else {
        res.json({ message: "Account Not Found", status: 0 });
      }
    }else{
   res.json({status:'0', message:"User Not Found  "})
    }

  }
    catch (error) {
      res.json({message:error.message});
    }
    
  });
  // Todo

  router.post("/todoCreate",requireLogin,async (req, res) => {
   try {
     let data= await Todo.create({
      todo:req.body.todo,
      todoBy:loginId
     });
     res.json({ status: 1, message: "Success" , data:data});
   } catch (error) {
     res.json({ status: 0, message: error.message });
   }
 });
 

  //  get todo her bandy k alg todo hu ga tu id se hmm find kry gy 
  //  id userloginid hai    jis se hmm find kry gy wo pora obj nikal k baj dain gy 

router.get("/gettodo",requireLogin,async(req,res)=>{
      const data=await Todo.find({
                 todoBy:loginId
      });
      res.json({status:1, data:data, message:'success'})
});
  

router.post("/deletetodo/:_id", requireLogin, async (req, res) => {
  try {
    console.log("called");
     console.log(req.body, " this is req");
     console.log(req.params._id, " this is params id ");

    let data = await Todo.findByIdAndUpdate(
      { _id: req.params._id },
      { status: "-1" }
    );
    console.log(data);
    return res.json({ status: 1, data:data });
  } catch (error) {
    res.json({ status: 0, message: error.message });
  }
});


module.exports = router;
