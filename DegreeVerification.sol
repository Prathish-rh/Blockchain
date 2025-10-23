pragma solidity ^0.8.0;

contract DegreeVerification {
    struct Degree {
        string studentName;
        string degree;
        string university;
        uint256 year;
        bool isIssued;
    }

    mapping(string => Degree) public degrees; // Key = studentID

    event DegreeIssued(string studentID, string studentName, string degree, string university, uint256 year);
    event DegreeVerified(string studentID, bool valid);

    // Issue a new degree (University)
    function issueDegree(string memory _studentID, string memory _studentName, string memory _degree, string memory _university, uint256 _year) public {
        require(!degrees[_studentID].isIssued, "Degree already issued for this ID");
        degrees[_studentID] = Degree(_studentName, _degree, _university, _year, true);
        emit DegreeIssued(_studentID, _studentName, _degree, _university, _year);
    }

    // Verify degree existence (Employer)
    function verifyDegree(string memory _studentID) public view returns (bool) {
        bool valid = degrees[_studentID].isIssued;
        return valid;
    }

    // Get full degree details
    function getDegreeDetails(string memory _studentID) public view returns (string memory, string memory, string memory, uint256, bool) {
        Degree memory d = degrees[_studentID];
        return (d.studentName, d.degree, d.university, d.year, d.isIssued);
    }
}
