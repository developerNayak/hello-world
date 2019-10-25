
const fs = require("fs");
const path = require("path");
const DatabaseName = "DB";

btnCreate = document.getElementById('btnCreate');
btnRead = document.getElementById('btnRead');
btnDelete = document.getElementById('btnDelete');
fileName = document.getElementById('fileName');
mathsMarks = document.getElementById('mathsMarks');
physicsMarks = document.getElementById('physicsMarks');
englishMarks = document.getElementById('EnglishMarks');

console.log(mathsMarks);

totalMarks = mathsMarks + physicsMarks + englishMarks;
console.log(totalMarks);
let avgMarks = totalMarks/3;
let pathName = path.join(__dirname, 'files');

btnCreate.addEventListener('click',function(){
  let file = path.join(pathName, DatabaseName);

  //Data structure to be saved
  let contents = {
     "info":[],
     "grades":[],
     "attendance":[]
  };

  fs.readFile(file, function(err, data){
    if(err){
      console.log("No file exists, creating a new one.");

      //creating the file for the first time 
      var infoObj = {}; //Object for info
      var gradeObj = {}; //Object for storing grades
      var attendanceObj = {}; //Object for storing attendance

      //set the data for these objects

      //starting with info object
      infoObj["studentName"] = fileName.value;
      infoObj["rollNum"] = "1"; //Unique key
      
      //now set the grade object
      gradeObj["rollNum"] = "1";
      gradeObj["studentName"] = fileName.value;
      gradeObj["maths"] = ((mathsMarks.value)===undefined || (mathsMarks.value)==null)?"":mathsMarks.value;
      gradeObj["physics"] = ((physicsMarks.value)===undefined || (physicsMarks.value)==null)?"":physicsMarks.value;
      gradeObj["english"] = ((englishMarks.value)===undefined || (englishMarks.value)==null)?"":englishMarks.value;

      //now set the attendance obejct
      attendanceObj["rollNum"] = "1";
      attendanceObj["attendance"] = "90";
      attendanceObj["studentName"] = fileName.value;

      //Now finally push these objects into their arrays 
      contents["info"].push(infoObj);
      contents["grades"].push(gradeObj);
      contents["attendance"].push(attendanceObj);

      //Now save the data in the local file
      var data = JSON.stringify(contents);
      fs.writeFile(file, data, function(err){
        if(err){
          console.log("err has occured");
        }
        console.log("the file has been written succesfully");
        return;
      })
    } else {
    //fileContents.value = data;
    console.log("the file was read");
    contents = JSON.parse(data);
     
    //Test 
     
   
    //test



    //update data
    //creating the file for the first time 
    var infoObj = {}; //Object for info
    var gradeObj = {}; //Object for storing grades
    var attendanceObj = {}; //Object for storing attendance

    //set the data for these objects

    //starting with info object
    infoObj["studentName"] = fileName.value;
    infoObj["rollNum"] = "1"; //Unique key
    
    //now set the grade obejct
    gradeObj["rollNum"] = "1";
    gradeObj["studentName"] = fileName.value;
    gradeObj["maths"] = ((mathsMarks.value)===undefined || (mathsMarks.value)==null)?"":mathsMarks.value;
    gradeObj["physics"] = ((physicsMarks.value)===undefined || (physicsMarks.value)==null)?"":physicsMarks.value;
    gradeObj["english"] = ((englishMarks.value)===undefined || (englishMarks.value)==null)?"":englishMarks.value;

    //now set the attendance obejct
    attendanceObj["rollNum"] = "1";
    attendanceObj["attendance"] = "90";
    attendanceObj["studentName"] = fileName.value;

    //Now finally push these objects into their arrays 
    contents["info"].push(infoObj);
    contents["grades"].push(gradeObj);
    contents["attendance"].push(attendanceObj);

    var data = JSON.stringify(contents);
    fs.writeFile(file, data, function(err){
      if(err){
        console.log("err has occured");
      }
      console.log("the file has been written succesfully")
    })
  }
    
  })

  // fs.writeFile(file, contents, function(err){
  //   if(err){
  //     console.log("err has occured");
  //   }
  //   console.log("the file has been written succesfully")
  // })
})

btnRead.addEventListener('click', function(){
  let file = path.join(pathName, fileName.value);
  fs.readFile(file, function(err, data){
    if(err){
      return console.log("err has occured");
    }
    fileContents.value = data;
    console.log("the file was read");
  })
})


  btnDelete.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value);
    fs.unlink(file, function(err){
      if(err){
        return console.log("err has occured");
      }

      fileName.value = '';

      fileContents.value = '';
      console.log("the file was deleted");
    })
})
