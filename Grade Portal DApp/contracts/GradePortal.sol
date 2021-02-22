// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.22 <0.8.0;

// import <"StringUtils">;

// import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract GradePortal 
{

    //Store Student Info
    //Read Student Info
    //Constructor

    struct studentInfo 
    {
        uint sId;    
        address addrs;
        string rollNo;
        string name;
        string grade;
        string publicKey;
    }

    uint public noOfStudents;

    // studentInfo[10] public studentList;
    
    // mapping(uint => studentInfo) public students;
    mapping(uint => studentInfo) public students;
    mapping(string => uint) public Key;

    constructor () public
    {
        //add necessary constructor code here
        noOfStudents = 0;
    }
    
    // function getStudents() public view returns (studentInfo [10] memory) 
    // {
    //     return studentList;
    // }

    function addStudent (address addrs, string memory name, string memory rollNo,string memory publicKey) public
    {
        noOfStudents++;
        // students[noOfStudents] = studentInfo(noOfStudents,addrs, name, rollNo, "NA");
        Key[publicKey] = noOfStudents;
        students[noOfStudents] = studentInfo(noOfStudents,addrs, name, rollNo, publicKey, "NA");
    }

    function setGrade (string memory rollNo, string memory grade) public 
    {

        students[Key[rollNo]].grade = grade;

        // for (uint256 index = 0; index < noOfStudents; index++) {
            // if ((StringUtils.equal(students[noOfStudents].rollNo == rollNo))) {
                 
                // students[roll[rollNo]].grade = grade;
                // students[noOfStudents].rollNo = rollNo;
            // } 
        // }
    }

    function showGrade (string memory publicKey) view public returns (string memory)
    {
        
        return students[Key[publicKey]].grade;
    }

}